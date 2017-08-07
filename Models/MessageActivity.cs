using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class MessageActivity
    {
        public int Id { get; set; }
        public string ConversationId { get; set; }
        public string SenderId { get; set; }
        public string Text { get; set; }
        public DateTime DateTimeSent { get; set; }
        public byte[] RowVersion { get; set; }



    }
}
