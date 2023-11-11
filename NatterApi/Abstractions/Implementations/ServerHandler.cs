using Microsoft.EntityFrameworkCore;
using NatterApi.Data;
using NatterApi.Models;
using NatterApi.Models.DTOs;

namespace NatterApi.Abstractions;

public class ServerHandler : IServerHandler {

    public string FailureReason { get; set; }

    private readonly NatterDbContext _context;

    public ServerHandler(NatterDbContext context) {
        _context = context;
    }
    
    public async Task<bool> CreateAsync(ServerCreateDto serverCreateDto) {
        try {
            ServerModel server = new() {
                Name = serverCreateDto.Name,
                Admins = serverCreateDto.Admins,
                Users = serverCreateDto.Users
            };
            
            await _context.Servers.AddAsync(server);

            return true;
        }
        catch {
            return false;
        }
    }

    public async Task<bool> Delete(string serverName, string currentUsername) {
        try {
            ServerModel server = await GetByName(serverName);

            if(server == null) {
                FailureReason = $"Error when fetching server with the name '{serverName}'";
                return false;
            }

            if(server.Admins.Contains(currentUsername)) {
                _context.Servers.Remove(server);
                return true;
            }
            else {
                FailureReason = "You are not an admin of this server. You cannot delete this server!";
                return false;
            }
        }
        catch(Exception exc) {
            FailureReason = exc.Message;
            return false;
        }
    }

    public async Task<ServerModel> GetByName(string serverName) {
        ServerModel? server = await _context.Servers.FirstOrDefaultAsync(n => n.Name == serverName);
        return server;
    }
}
