using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace NatterApi.Controllers;

public class Chats : Controller {

    public class ServerModel {
        public string name { get; set; }
        public int members { get; set; }
        public string area { get; set; }
    }

    public IActionResult Server(string name, int members, string area) {
        
        var serverInfo = new ServerModel() {
            name = name,
            members = members,
            area = area
        };

        return Json(JsonSerializer.Serialize<ServerModel>(serverInfo));
    }
}