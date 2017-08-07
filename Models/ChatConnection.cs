using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class ChatConnection
    {
        public int Id { get; set; }
        public string ConversationId { get; set; }
        public Guid UserId { get; set; } 
        public string DateTimeConnected { get; set; }
        public string DateTimeDisconnected { get; set; }
        public byte[] RowVersion { get; set; }

        
    }
}
