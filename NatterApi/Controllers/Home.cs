using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Models;

namespace NatterApi.Controllers;

public class Home : Controller {
    
    public IActionResult Index() {
        return Ok("Welcome to Natter API");
    }

    [HttpPost]
    public IActionResult Test([FromBody] UserModel user) {
        return Json(JsonSerializer.Serialize(user));
    }
}