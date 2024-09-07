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
using BrieflyServer.Middleware;
using Newtonsoft.Json.Linq;

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
    public async Task<IActionResult> Register([FromBody]RegistrationModel i_Model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            User? existingUser = await userManager.FindByEmailAsync(i_Model.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            User user = new User(i_Model.Email,i_Model.UserName);
            var result = await userManager.CreateAsync(user,i_Model.Password);
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
    public async Task<IActionResult> Login([FromBody]LoginModel i_Model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            User? user = await userManager.FindByEmailAsync(i_Model.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }

            var result = await signInManager.PasswordSignInAsync(user, i_Model.Password, false, false);
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
        catch (Exception exception)             
        {
            return BadRequest(exception.Message);
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
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest i_Request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        User? user = await userManager.FindByEmailAsync(i_Request.Email);
        if (user == null)
        {
            return Ok("If your email is registered, you will receive an email with instructions on how to reset your password");
        }

        var existingToken = await context.ForgotPassword.FirstOrDefaultAsync(token => token.Email == i_Request.Email);
        var otp = new Random().Next(1000, 9999).ToString();
        var hashedOtp = BCrypt.Net.BCrypt.HashPassword(otp);
        if (existingToken != null)
        {
            existingToken.HashedOtp = hashedOtp;
        }
        else
        {
            var forgotPasswordToken = new ForgotPasswordToken(i_Request.Email, hashedOtp);
            context.ForgotPassword.Add(forgotPasswordToken);
        }

        await context.SaveChangesAsync();
        emailService.SendMail(i_Request.Email, otp);
        return Ok("Email verification sent");
    }

    [HttpPost("otp")]
    public async Task<IActionResult> VerifyOtp([FromBody] OtpModel i_Model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        User? user = await userManager.FindByEmailAsync(i_Model.Email);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var forgotPasswordToken = await context.ForgotPassword.FirstOrDefaultAsync(user => user.Email == i_Model.Email);
        if (forgotPasswordToken == null)
        {
            return BadRequest("Invalid OTP");
        }

        if (!BCrypt.Net.BCrypt.Verify(i_Model.Otp,forgotPasswordToken.HashedOtp))
        {
            return BadRequest("Invalid OTP");
        }

        var token = await userManager.GeneratePasswordResetTokenAsync(user);// Create reset token
        context.ForgotPassword.Remove(forgotPasswordToken);//invalidate the OTP after it's been used
        await context.SaveChangesAsync();

        return Ok(new {Token = token, Message = "OTP verified successfully" });
    }

    [HttpPost("new-password")]
    public async Task<IActionResult> ResetPassword([FromBody] NewPassRequestModel i_Model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        User? user = await userManager.FindByEmailAsync(i_Model.Email);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var result = await userManager.ResetPasswordAsync(user, i_Model.Token, i_Model.NewPassword);
        if (result.Succeeded)
        {
            return Ok("Password reset successfully");
        }
        else
        {
            return BadRequest("Failed to reset password");
        }
    }

    [HttpPost("external-auth")]
    public async Task<IActionResult> ExternalAuth([FromBody] ExternalAuthDto authDto)
    {
        if (authDto.Provider == "Google")
        {
            var googlePayload = await GoogleAuth.VerifyGoogleToken(authDto.Token);
            if (googlePayload != null)
            {
                var user = await FindOrCreateUser(googlePayload.Email, googlePayload.Name);
                var jwt = GenerateJwtToken(user);
                return Ok(new { Token = jwt, Message = "User logged in successfully" });
            }
        }
        else if (authDto.Provider == "Facebook")
        {
            var facebookPayload = await FacebookAuth.VerifyFacebookToken(authDto.Token);
            if (facebookPayload != null)
            {
                var email = facebookPayload["email"].ToString();
                var user = await FindOrCreateUser(email, null);
                var jwt = GenerateJwtToken(user);
                return Ok(new { Token = jwt, Message = "User logged in successfully" });
            }
        }

        return Unauthorized("Invalid token");
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

    private async Task<User> FindOrCreateUser(string email, string? name)
    {
        var user = await userManager.FindByEmailAsync(email);
        if (user == null)
        {
            user = new User(email, name ?? email);
            await userManager.CreateAsync(user);
        }
        return user;
    }
}