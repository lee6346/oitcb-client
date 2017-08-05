using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class MessageLogDTO
    {
        public string ConversationId { get; set; }
        public string SenderId { get; set; }
        public string Timestamp { get; set; }
        public string Text { get; set; }
    }

}
