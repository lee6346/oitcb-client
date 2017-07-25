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
using WebSocketManager.Common;
using System.Reflection;
using Newtonsoft.Json;

namespace chatbot_portal.Controllers
{
    
    [Route("api/[controller]")]
    public class AgentTransferController : Controller 
    {

        private readonly DatabaseContext _dbcontext;
        private readonly LiveRequestService _lrcontext;

        public AgentTransferController(DatabaseContext dbcontext, LiveRequestService lrcontext)
        {
            this._dbcontext = dbcontext;
            this._lrcontext = lrcontext;
        }

        
        [HttpGet("[action]")]
        public async Task<IActionResult> GetRequests()
        {
            var queue = await _dbcontext.ConversationQueue
                .Select(x => new { conv_id = x.ID, action = "request", datetime = "none", user = "student" })
                .ToListAsync();

            

            return Json(queue);
            
        }
      
        [HttpPost("[action]")]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> MakeRequest([FromBody] Object obj/*string conv_id, string action, string datetime, string user*/)
        {
            
            if(_lrcontext.AgentsAvailable() == 0)
            {
                return Json(new { available = false} );
            }
            /*
            if (await _dbcontext.RequestPending(conv_id) == false)
            {
                return Json(new { available = "error" });
            }

            var obj = new
            {
                conv_id = conv_id,
                action = action,
                datetime = datetime,
                user = user
            };
            */

            //DateTime.ParseExact(datetime, "dd/MM/yyyy HH:mm:ss", CultureInfo.InvariantCulture);
            await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = obj.ToString() });

            return Json(new { available = true });
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> AcceptRequest([FromBody] Object obj)
        {
            /*
            var obj = new
            {
                conv_id = conv_id,
                action = action,
                datetime = datetime,
                user = user
            };*/
            // this broadcast message is of action type remove


            await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = obj.ToString() });
            

           // Type t = obj.GetType();
            //string conv = (string)t.GetProperty("conv_id").GetValue(obj, null);
            //PropertyInfo[] props = obj.GetType().GetProperties();
            //string test = props[2].Name;
            /*
            foreach(PropertyInfo prop in props)
            {
                if (prop.Name.Equals("conv_id")){
                    conv_id = prop.GetValue(obj, null);
                }
            }
            */
            //var result = await _dbcontext.DeleteRequest(x.ToString());
            /*
            if (!result)
            {
                return Json(BadRequest(x.ToString()));
            }
            */
            return Json(Accepted());
        }

        
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

            await _lrcontext.SendMessageToAllAsync(new Message { MessageType = MessageType.Text, Data = obj.ToString() });
            var result = await _dbcontext.DeleteRequest(conv_id);
            if (!result)
            {
                return Json(BadRequest("Already Removed"));
            }

            return Json(null);
        }


    }
}
