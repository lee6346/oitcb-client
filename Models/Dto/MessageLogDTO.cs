using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class MessageLogDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("senderId")]
        public string SenderId { get; set; }
        [JsonProperty("timestamp")]
        public string Timestamp { get; set; }
        [JsonProperty("text")]
        public string Text { get; set; }
    }

}
