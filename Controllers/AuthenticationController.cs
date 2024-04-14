using BrieflyServer.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using BrieflyServer.Data;
using BrieflyServer.Services;
using System.Net;

[ApiController]
[Route("[controller]")]
public class AuthenticationController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly BrieflyContext _context;
    private readonly EmailService _emailService;
    public AuthenticationController( UserManager<User> userManager, SignInManager<User> signInManager,BrieflyContext context,EmailService emailService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
        _emailService = emailService;   
    }
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody]RegistrationModel model)
    {
        //var user2 = await _userManager.FindByEmailAsync("maorhalevi@gmail.com");
        //_userManager.DeleteAsync(user2);
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        try
        {
            var existingUser = await _userManager.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return Conflict("User with this email already exists");
            }

            var user = new User(model.Email, model.PreferredTopics);
            var result = await _userManager.CreateAsync(user,model.Password);
            if (result.Succeeded)
            {
                return Ok("User registered successfully");
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
            var user = await _userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var result = await _signInManager.PasswordSignInAsync(user, model.Password, false, false);
            if (result.Succeeded)
            {
                // Generate token or redirect to authenticated page
                return Ok("User logged in successfully");
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

    //[Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();

        return Ok("User logged out successfully");
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Ok("If your email is registered, you will receive an email with instructions on how to reset your password");
        }
        var otp = new Random().Next(1000, 9999).ToString();
        var hashedOtp = BCrypt.Net.BCrypt.HashPassword(otp);
        var forgotPasswordToken = new ForgotPasswordToken(request.Email, hashedOtp);
        _context.ForgotPassword.Add(forgotPasswordToken);
        await _context.SaveChangesAsync();
        _emailService.sendMail(request.Email, otp);
        return Ok("Email verification sent");
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user == null)
        {
            return BadRequest("User not found");
        }
        var forgotPasswordToken = await _context.ForgotPassword.FirstOrDefaultAsync(user => user.Email == model.Email);
        if (forgotPasswordToken == null)
        {
            return BadRequest("Invalid OTP");
        }
        if (!BCrypt.Net.BCrypt.Verify(model.Otp,forgotPasswordToken.HashedOtp))
        {
            return BadRequest("Invalid OTP");
        }
        // Reset the user's password
        var token = await _userManager.GeneratePasswordResetTokenAsync(user);
        var result = await _userManager.ResetPasswordAsync(user, token, model.NewPassword);

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
}