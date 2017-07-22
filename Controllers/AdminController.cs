using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chatbot_portal.Data;
using chatbot_portal.Models;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {

        private readonly DatabaseContext _context;

        public AdminController(DatabaseContext context)
        {
            this._context = context;
        }
        /*
        [HttpPost("[action]")]
        public async Task<IActionResult> Login()
        {

        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Edit()
        {

        }

        [HttpDelete("[action]")]
        public async Task<IActionResult> Remove()
        {

        }

    */
    }
}
