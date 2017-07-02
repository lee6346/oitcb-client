using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Controllers
{
    public class AuthenticatedUserController : BaseController
    {
        //will store id as arg so the URL-> home/agent/{GUID}
        public IActionResult Agent()
        {
            return View();
        }
        /*
        public async Task<IActionResult> Admin()
        {

            //create await methods for auth/validation
            return View();
        }
        */
    }
}
