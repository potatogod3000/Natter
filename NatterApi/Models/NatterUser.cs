using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Identity;

namespace NatterApi.Models;

public class NatterUser: IdentityUser {

    public NatterUser() {
        ServersJoined = new();
    }
    
    public string? RefreshToken { get; set; }

    [JsonIgnore]
    public string PhoneNumber { get; set; }

    public string Country { get; set; }

    public List<string> ServersJoined { get; set; }
}