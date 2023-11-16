namespace NatterApi.Models.DTOs;

public class ServerCreateDto {

    public string Name { get; set; }

    public List<string> Admins { get; set; }

    public List<string> Users { get; set; }

}
