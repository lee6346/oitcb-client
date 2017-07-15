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
    [Route("api/[controller]")]
    public class LiveChatController
    {

        private readonly DatabaseContext _context;

        public LiveChatController(DatabaseContext context)
        {
            this._context = context;
        }


        [HttpGet("[action]")]
        public IList<UserQueue> PendingRequests()
        {
            List<UserQueue> requestList = new List<UserQueue>();
            requestList.Add(new UserQueue { ID = "123345", RequestTime = DateTime.Now });
            requestList.Add(new UserQueue { ID = "123444", RequestTime = DateTime.Now });
            return requestList;
        }

 
    }
}
