using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BrieflyServer.Data;
using BrieflyServer.Models;
using BrieflyServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using static System.Net.WebRequestMethods;

namespace BrieflyServer.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthenticationController(
    UserManager<User> userManager,
    SignInManager<User> signInManager,
    BrieflyContext context,
    EmailService emailService,
    IConfiguration configuration)
    : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegistrationModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var existingUser = await userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            var user = new User(model.Email,model.UserName);
            var result = await userManager.CreateAsync(user,model.Password);
            if (result.Succeeded)
            {
                await signInManager.SignInAsync(user, isPersistent: false);
                var token = GenerateJwtToken(user);
                return Ok(new { Token = token ,Message= "User registered successfully"});
            }
            else
            {
                var errors = string.Join(", ", result.Errors.Select(e => e.Description));
                return Conflict($"Failed to register user: {errors}");
            }
        }
        catch (Exception error)
        {
            return Conflict(error.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody]LoginModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var result = await signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (result.Succeeded)
            {
                var token = GenerateJwtToken(user);
                return Ok(new { Token = token, Message = "User logged in successfully" });
            }
            else
            {
                return Unauthorized("Invalid login attempt");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return Ok("User logged out successfully");
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Ok("If your email is registered, you will receive an email with instructions on how to reset your password");
        }
        var existingToken = await context.ForgotPassword.FirstOrDefaultAsync(t => t.Email == request.Email);
        var otp = new Random().Next(1000, 9999).ToString();
        var hashedOtp = BCrypt.Net.BCrypt.HashPassword(otp);
        if (existingToken != null)
        {
            existingToken.HashedOtp = hashedOtp;
        }
        else
        {
            var forgotPasswordToken = new ForgotPasswordToken(request.Email, hashedOtp);
            context.ForgotPassword.Add(forgotPasswordToken);
        }
        await context.SaveChangesAsync();
        emailService.SendMail(request.Email, otp);
        return Ok("Email verification sent");
    }

    [HttpPost("otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] OtpModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var forgotPasswordToken = await context.ForgotPassword.FirstOrDefaultAsync(user => user.Email == model.Email);
        if (forgotPasswordToken == null)
        {
            return BadRequest("Invalid OTP");
        }

        if (!BCrypt.Net.BCrypt.Verify(model.Otp,forgotPasswordToken.HashedOtp))
        {
            return BadRequest("Invalid OTP");
        }
        // Create reset token
        var token = await userManager.GeneratePasswordResetTokenAsync(user);

        //invalidate the OTP after it's been used
        context.ForgotPassword.Remove(forgotPasswordToken);
        await context.SaveChangesAsync();

        return Ok(new {Token = token, Message = "OTP verified successfully" });
    }
    [HttpPost("new-password")]
    public async Task<IActionResult> ResetPassword([FromBody] NewPassRequestModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest("User not found");
        }
        var result = await userManager.ResetPasswordAsync(user, model.Token, model.NewPassword);

        if (result.Succeeded)
        {
            // Password reset successful, you can redirect the user to a success page
            return Ok("Password reset successfully");
        }
        else
        {
            // Password reset failed, handle the failure (e.g., show an error message)
            return BadRequest("Failed to reset password");
        }
    }
    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email)
        };

        var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
        var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
        var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");
        var jwtTime = Environment.GetEnvironmentVariable("JWT_TIME");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtIssuer,
            audience: jwtAudience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtTime)),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}