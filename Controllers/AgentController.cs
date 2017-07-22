using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using chatbot_portal.Data;
using chatbot_portal.Models;
using chatbot_portal.Services;
using Microsoft.AspNetCore.Http;
using System.Net.WebSockets;

namespace chatbot_portal.Controllers
{
    [Route("api/[controller]")]
    public class AgentController : Controller
    {

        private readonly DatabaseContext _dbcontext;
        private readonly LiveRequestService _liveService;

        public AgentController(DatabaseContext context, LiveRequestService liveService)
        {
            this._dbcontext = context;
            this._liveService = liveService;
        }

       //need to set this to store the agent in the LiveConnection db
        [HttpPost("[action]")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(string username, string password)
        {
            //authenticate user credentials
            var user = await _dbcontext.GetAgent(username, password);
            if (user == null)
            {
                return Json(Unauthorized());
            }

            //retrieve a list all pending requets/return
            var queue = await _dbcontext.ConversationQueue
                .Select(x => new { conv_id = x.ID, action = "request", datetime = "none", user = "student" })
                .ToListAsync();


            return Json(queue);
        }



        [HttpGet("[action]")]
        public async Task<IActionResult> Logout(string sock_id)
        {
            //remove websocket connection and redirect to home page
            await _liveService.OnDisconnected(_liveService.GetSocket(sock_id));
            return Redirect("/home");

        }
        

        [HttpGet("[action]")]
        public async Task<IActionResult> GetAll()
        {
            //return a list of all agents
            var agents = await _dbcontext.Agents.ToListAsync();
            if(agents == null)
            {
                return Json(NotFound());
            }
            return Json(agents);

        }

     
        [HttpPost("[action]")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Update(Agent agent)
        {
            if(agent == null)
            {
                return Json(NotFound());
            }

            if(await TryUpdateModelAsync<Agent>(
                agent,
                "", 
                ag => ag.Password, ag => ag.FirstName, ag => ag.LastName, ag => ag.UserName))
            {
                try
                {
                    await _dbcontext.SaveChangesAsync();
                    
                }
                catch(DbUpdateException)
                {
                    return Json(new {status = "dbfail" });
                }

            }
            return Json(new { status = "updated" });
        }

        
        [HttpDelete("[action]")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Remove(string username)
        {

            var ag = await _dbcontext.Agents
                .FirstOrDefaultAsync(a => a.UserName == username);
            if (ag == null)
            {
                return Json(NotFound());
            }
             
            try
            {
                _dbcontext.Agents.Remove(ag);
                await _dbcontext.SaveChangesAsync();
                return Json(new {status = "removed" });
            } catch (DbUpdateException)
            {
                return Json(new { status = "dbfail" });
            }

        }

    
    }
}
