using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using chatbot_portal.Services;
using chatbot_portal.Interfaces;


namespace chatbot_portal.Controllers
{
    /**
     * This controller is used to receive a secret or a token from the server to connect to a chatbot
     */
    [Route("api/[controller]")]
    public class ChatTokenController : Controller
    {
        private readonly ISecretTokenService _service;
        public ChatTokenController(ISecretTokenService service)
        {
            _service = service;
        }


        [HttpGet("[action]")]
        public async Task<IActionResult> GetConversationObject()
        {
           var conv = await _service.GetConversationAsync();
            if(conv == null)
            {
                return Json(BadRequest());
            }
            return Json(conv);
        }


        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetToken()
        {

            var token = await _service.GetTokenAsync();
            if(token == null)
            {
                return Json(BadRequest());
            }

            return Json(token);
        }
        

        [HttpGet("[action]")]
        public IActionResult GetSecret(/*[FromBody] string credential*/)
        {

            /*check the string credential...
            if(credential == null)
            {
                return Json(Unauthorized());
            }
            */
            object sec = _service.GetSecret();

            return Json(sec);
        }
        
    }
}
