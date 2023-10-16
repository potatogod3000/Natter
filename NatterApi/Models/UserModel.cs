using System.ComponentModel.DataAnnotations;

namespace NatterApi.Models;

public class UserModel {

    public int Id { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }

}