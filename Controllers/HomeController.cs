using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace chatbot_portal.Controllers
{

    /**
     * Renders views for home and agent
     */

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
        /*
        public async Task<IActionResult> Agent()
        {
            return View();
        } */
    }
}
