using System.Security.Claims;
using NatterApi.Models;

namespace NatterApi.Abstractions;

public interface ICookieHandler {
    Task Create(NatterUser user, HttpContext context);

    Task<List<Claim>> GetClaimsAsync(NatterUser user);
}
