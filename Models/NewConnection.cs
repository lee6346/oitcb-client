using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class NewConnection
    {
        public string conversationId { get; set; }
        public string token { get; set; }
        public string streamUrl { get; set; }
    }
}
