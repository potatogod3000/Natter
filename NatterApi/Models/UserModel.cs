using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NatterApi.Models;

public class UserModel {

    public UserModel() {
        ServersJoined = new();
    }

    public int Id { get; set; }

    public string? RefreshToken { get; set; }

    [Required]
    public string UserName { get; set; }

    [Required]
    public string Email { get; set; }

    [Required]
    [JsonIgnore]
    public string Password { get; set; }

    [JsonIgnore]
    public int PhoneNumber { get; set; }

    public string Country { get; set; }

    public List<string> ServersJoined { get; set; }
}