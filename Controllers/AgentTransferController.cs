using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using chatbot_portal.Data;
using chatbot_portal.Models;
using Microsoft.EntityFrameworkCore;
using chatbot_portal.Services;
using WebSocketManager;
using System.Reflection;
using Newtonsoft.Json;
using WebSocketManager.Common;
using chatbot_portal.Repositories;
using chatbot_portal.Models.Dto;

namespace chatbot_portal.Controllers
{
    
    [Route("api/[controller]")]
    public class AgentTransferController : Controller 
    {

        //private readonly DatabaseContext _dbcontext;
        private readonly LiveRequestService _lrcontext;
        private readonly IAgentRequestRepository _repo;

        public AgentTransferController(/*DatabaseContext dbcontext, */LiveRequestService lrcontext, IAgentRequestRepository repo)
        {
           // _dbcontext = dbcontext;
            _lrcontext = lrcontext;
            _repo = repo;
        }
        
        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetRequests()
        {
            /*
            var queue = await _dbcontext.LiveRequests
                .Select(x => new { conv_id = x.conv_id, action = "request", datetime = x.date, user = "student" })
                .ToListAsync();

            */
            var requests = await _repo.GetPendingRequests();

            return Json(requests);
            
        }
      
        [HttpPost("[action]")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> MakeRequest([FromBody] AgentRequestDTO request)//LiveRequest request)
        {
            
            if(_lrcontext.AgentsAvailable() == 0)
            {
                return Json(new { available = false} );
            }
            /*
            if (await _dbcontext.RequestPending(request) == false)
            {
                return Json(new { available = "error" });
            }
            */
            /*
            if((await _repo.CreateLiveRequest(request)) == false)
            {
                return Json(new { available = "error" });
            }
            */
            //DateTime.ParseExact(datetime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);

            
            
            await _lrcontext.SendMessageToAllAsync(new WebSocketManager.Common.Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(request) });
            return Json(new { available = true });
            
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AcceptRequest([FromBody] AgentRequestDTO request)//LiveRequest request)
        {


            await _lrcontext.SendMessageToAllAsync(new WebSocketManager.Common.Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(request) });

            var result = await _repo.UpdateLiveRequest(request);//_dbcontext.DeleteRequest(request.conv_id);
            
            if (!result)
            {
                return Json(BadRequest());
            }
            
            return Json(Accepted());
        }
        /*
        
        [HttpGet("[action]")]
        public async Task<IActionResult> RemoveRequest(string conv_id)
        {

            var obj = new
            {
                conv_id = conv_id,
                action = "remove",
                datetime = "",
                user = "",
            };

            await _lrcontext.SendMessageToAllAsync(new WebSocketManager.Common.Message { MessageType = MessageType.Text, Data = obj.ToString() });
            var result = await _dbcontext.DeleteRequest(conv_id);
            if (!result)
            {
                return Json(BadRequest("Already Removed"));
            }

            return Json(null);
        }

    */
    }
}
