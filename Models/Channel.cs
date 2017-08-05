using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class Channel
    {
        public int Id { get; set; }
        public string ConversationId { get; set; }
        public string BotHandle { get; set; }
        public string DateTimeCreated { get; set; }
        public string DateTimeEnded { get; set; }
        public byte[] RowVersion { get; set; }

        public DateTime DateFormatter { get; set; }



        

    }

}
