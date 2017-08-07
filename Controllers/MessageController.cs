using chatbot_portal.Data;
using chatbot_portal.Models;
using chatbot_portal.Models.Dto;
using chatbot_portal.Repositories;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : Controller
    {
        private readonly IActivityMessageRepository _msgrepo;

        public MessageController(IActivityMessageRepository repo)
        {
            _msgrepo = repo;
        }

        
        [HttpPost("[action]")]
        public async Task<IActionResult> SendMessage([FromBody] DirectLineActivityDTO dl)
        {


            var result = await _msgrepo.StoreMessage(dl);
            return Json(result);
        }
        
        [HttpGet("[action]/{id}")]
        public async Task<IActionResult> GetActivityLog(string id)
        {

            var log = await _msgrepo.GetMessageLogByConversation(id);
            return Json(log);
        }
        
    }
}
