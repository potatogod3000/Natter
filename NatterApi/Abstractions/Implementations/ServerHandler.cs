using NatterApi.Data;
using NatterApi.Models;
using NatterApi.Models.DTOs;

namespace NatterApi.Abstractions;

public class ServerHandler : IServerHandler {

    private readonly NatterDbContext _context;

    public ServerHandler(NatterDbContext context) {
        _context = context;
    }
    
    public async Task<bool> CreateAsync(ServerCreateDto newServer) {
        ServerModel server = new() {
            Name = newServer.Name,
            Admins = new(),
            Users = new()
        };
        
        await _context.Servers.AddAsync(server);

        return false;
    }

    public async Task<bool> DeleteAsync(ServerDeleteDto server) {
        return false;
    }
}
