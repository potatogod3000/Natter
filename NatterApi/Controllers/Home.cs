using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using NatterApi.Models;

namespace NatterApi.Controllers;

[Route("/api")]
public class Home : Controller {
    
    public IActionResult Index() {
        return Ok("Welcome to Natter API");
    }
}