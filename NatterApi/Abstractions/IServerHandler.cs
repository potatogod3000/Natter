using NatterApi.Models.DTOs;

namespace NatterApi.Abstractions;

public interface IServerHandler {

  Task<bool> CreateAsync(ServerCreateDto newServer);

  Task<bool> DeleteAsync(ServerDeleteDto server);

}
