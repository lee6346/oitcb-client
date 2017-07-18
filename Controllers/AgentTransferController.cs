using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using chatbot_portal.Data;
using chatbot_portal.Models;

namespace chatbot_portal.Controllers
{
    [Produces("application/json")]
    [Route("api/AgentTransfer")]
    public class AgentTransferController : Controller 
    {

        private readonly DatabaseContext _context;

        public AgentTransferController(DatabaseContext context)
        {
            this._context = context;
        }


        [HttpGet("PendingRequests")]
        public IActionResult PendingRequests()
        {

            List<UserQueue> requestList = new List<UserQueue>();
            requestList.Add(new UserQueue { ID = "123345", RequestTime = DateTime.Now });
            requestList.Add(new UserQueue { ID = "123444", RequestTime = DateTime.Now });
            return Json(requestList);
        }

 
    }
}
