using NatterApi.Models;
using NatterApi.Models.DTOs;

namespace NatterApi.Abstractions;

public interface IServerHandler {

  string FailureReason { get; set; }

  Task<bool> CreateAsync(ServerCreateDto serverCreateDto);

  Task<bool> Delete(string serverName, string currentUsername);

  Task<ServerModel> GetByName(string serverName);
}
