using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class DirectLineActivityDTO
    {
        [JsonProperty("id")]
        public string ActivityID { get; set; }
        [JsonProperty("conversation")]
        public Conversation Conversation { get; set; }
        [JsonProperty("from")]
        public Sender Sender { get; set; }
        [JsonProperty("text")]
        public string Message { get; set;  }
        [JsonProperty("timestamp")]
        public string TimeStamp { get; set; }
    }

    public class Sender
    {
        [JsonProperty("id")]
        public string SenderID { get; set; }
    }

    public class Conversation
    {
        [JsonProperty("id")]
        public string ConversationID { get; set; }
    }
}
