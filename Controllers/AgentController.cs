using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using chatbot_portal.Services;
using chatbot_portal.Repositories;
using chatbot_portal.Models.Dto;
using WebSocketManager.Common;
using Newtonsoft.Json;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class AgentController : Controller
    {

        private readonly IAgentRepository _repository;
        private readonly LiveRequestService _liveService;

        public AgentController(IAgentRepository repository, LiveRequestService liveService)
        {
            _repository = repository;
            _liveService = liveService;
        }
        

        [HttpPost("[action]")]
        public async Task<IActionResult> SendMessage(AgentMessageDTO msg)
        {
            await _liveService.SendMessageToAllAsync(new Message
            {
                MessageType = MessageType.Text,
                Data = JsonConvert.SerializeObject(msg)
            });
            return Json(Ok(msg));
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Register(AgentRegisterDTO ag)
        {
            var status = await _repository.CreateAgent(ag);
            if(status.RegisterStatus != "complete")
            {
                return Json(BadRequest(new { err = status.RegisterStatus }));
            }
            return Json(Ok());
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Login(AgentLoginDTO ag)
        {

            var status = await _repository.AgentLogin(ag);
            if (status.LoginStatus != "complete")
            {
                return Json(BadRequest(new {err = status.LoginStatus}));
            }

            return Json(Ok());
        }


        //this logout method should remove session cookies, etc
        [HttpGet("[action]")]
        public async Task<IActionResult> Logout(string sock_id)
        {
            //remove websocket connection and redirect to home page
            await _liveService.OnDisconnected(_liveService.GetSocket(sock_id));
            return Redirect("/home");

        }
        

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAgents()
        {
            //return a list of all agents
            var agents = await _repository.GetAgents();
            if(agents == null)
            {
                return Json(NoContent());
            }
            return Json(agents);

        }

     
        [HttpPost("[action]")]
        public async Task<IActionResult> Update(AgentUpdateDTO ag)
        {

            var status = await _repository.UpdateAgent(ag);
            if(status.UpdateStatus != "complete")
            {
                return Json(BadRequest(new { err = status.UpdateStatus }));
            }
            return Json(Ok());
        }

        
        [HttpPost("[action]")]
        public async Task<IActionResult> Remove(AgentRemoveDTO agent)
        {
            var status = await _repository.RemoveAgent(agent);
            if(status.RemoveStatus != "complete")
            {
                return Json(BadRequest(new { err = status.RemoveStatus }));
            }
            return Json(Ok());

        }
        
    
    }
}
