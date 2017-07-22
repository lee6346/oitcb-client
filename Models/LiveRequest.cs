using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class LiveRequest
    {
        [Key]
        public int ConversationID { get; set; }
        public DateTime RequestMade { get; set; }
        public int AgentId { get; set; }
        public DateTime RequestAccepted { get; set; }
        [Timestamp]
        public byte[] TIMESTAMP { get; set; }

    }
}
