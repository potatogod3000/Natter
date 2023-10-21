using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatterApi.Models;

public class UserModel {

    public int Id { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [JsonIgnore]
    public string Password { get; set; }

    public int PhoneNumber { get; set; }

    public string Country { get; set; }
}