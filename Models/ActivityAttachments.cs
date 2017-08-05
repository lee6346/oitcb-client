using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class ActivityAttachments
    {
        public int Id { get; set; }
        public int MessageId { get; set; }
        public string AttachMentUri { get; set; }
        public MessageActivity MessageActivity {get; set;}
    }
}
