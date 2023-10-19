using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatterApi.Dtos;

public class LoginDto {

    public string Email { get; set; }

    public string Password { get; set; }
}

public class RegisterDto {

    [Key]
    public int Id { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }

    public string Country { get; set; }

    public int PhoneNumber { get; set; }
}