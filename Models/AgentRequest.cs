using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class AgentRequest
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string ConversationId { get; set; }
        public DateTime DateTimeRequested { get; set; }
        public byte[] RowVersion { get; set; }

    }
}
