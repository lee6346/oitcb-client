using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class ConversationDTO
    {
        public string conversationId { get; set; }
        public int expires_in { get; set; }
        public string streamUrl { get; set; }
        public string token { get; set; }
    }
}
