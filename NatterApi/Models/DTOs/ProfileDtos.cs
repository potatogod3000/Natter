using System.ComponentModel.DataAnnotations;

namespace NatterApi.Models.DTOs;

public class UpdateUserDto {

    [Required]
    public string Email { get; set; }

    [Required]
    public string UserName { get; set; }

    public string Country { get; set; }

    public string PhoneNumber { get; set; }
}

public class UpdatePasswordDto {
    
    [Required]
    public string CurrentPassword { get; set; }
    
    public string NewPassword { get; set; }
}