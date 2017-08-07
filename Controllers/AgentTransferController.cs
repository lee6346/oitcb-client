using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using chatbot_portal.Services;
using Newtonsoft.Json;
using WebSocketManager.Common;
using chatbot_portal.Repositories;
using chatbot_portal.Models.Dto;
using chatbot_portal.Models;
using System;

namespace chatbot_portal.Controllers
{
    
    [Route("api/[controller]")]
    public class AgentTransferController : Controller 
    {

       
        private readonly LiveRequestService _lrcontext;
        private readonly IAgentRequestRepository _repo;

        public AgentTransferController(LiveRequestService lrcontext, IAgentRequestRepository repo)
        {
            _lrcontext = lrcontext;
            _repo = repo;
        }
        
        

        [HttpGet("[action]")]
        public async Task<IActionResult> GetRequests()
        {

            var requests = await _repo.GetPendingRequests();
            return Json(requests);
  
        }
        

        [HttpPost("[action]")]
        public async Task<IActionResult> MakeRequest([FromBody] AgentRequestDTO request)
        {
            
            if(_lrcontext.AgentsAvailable() == 0)
            {
                return Json(new RequestStatusDTO { LiveStatus = "unavailable" });
            }


            var status = await _repo.CreateLiveRequest(request);
            if (status.LiveStatus.Equals("available"))
            {
                await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(request) });

            }
            //await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(request) });
            return Json(status);         
        }
        
        [HttpPost("[action]")]
        public async Task<IActionResult> AcceptRequest([FromBody] AgentRequestDTO request)
        {

            var status = await _repo.RemoveLiveRequest(request);
            if(status.RemoveStatus.Equals(RemoveStatus.Removed))
            {
                await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = JsonConvert.SerializeObject(request) });
            }

            return Json(status);
        }
        

    }
}
