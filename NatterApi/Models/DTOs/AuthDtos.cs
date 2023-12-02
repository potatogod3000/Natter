using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatterApi.Models.DTOs;

public class LoginDto {

    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
}

public class RegisterDto {

    [Required]
    public string Email { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Password { get; set; }

    public string Country { get; set; }

    public string PhoneNumber { get; set; }

    public string PhoneNumberAreaCode { get; set; }
}