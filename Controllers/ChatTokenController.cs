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
using chatbot_portal.Models;

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
            
           Conversation conv = await _service.GetConversationAsync();
            if(conv == null)
            {
                return Json(BadRequest());
            }
            return Json(conv);
        }


        
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetNewConnection(string id)
        {
            if(id == null)
            {
                return Json(BadRequest());
            }

            NewConnection nc = await _service.GetConnectionStreamAsync(id);
            if(nc == null)
            {
                return Json(BadRequest());
            }

            return Json(nc);
        }
        
        //need to include authentication to make such request
        [HttpGet("[action]")]
        public IActionResult GetSecret()
        {

            object sec = _service.GetSecret();

            return Json(sec);
        }
        
    }
}
