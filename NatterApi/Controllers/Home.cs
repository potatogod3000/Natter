using Microsoft.AspNetCore.Mvc;

namespace NatterApi.Controllers;

public class Home : Controller {
    
    public IActionResult Index() {
        return Ok("Welcome to Natter API");
    }
}