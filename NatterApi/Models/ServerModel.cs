using System.ComponentModel.DataAnnotations;

namespace NatterApi.Models;

public class ServerModel {

  public ServerModel() {
    Messages = new();
  }

  [Key]
  [Required]
  public string Name { get; set; }

  [Required]
  public List<string> Users { get; set; }

  [Required]
  public List<string> Admins { get; set; }

  public List<string> Messages { get; set; }
}
