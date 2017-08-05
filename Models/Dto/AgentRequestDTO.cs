using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{

    public class AgentRequestDTO
    {
        [JsonProperty("conv_id")]
        public string ConversationId { get; set; }
        [JsonProperty("user")]
        public string UserId { get; set; }
        [JsonProperty("action")]
        public string Action { get; set; }
        [JsonProperty("date")]
        public string SentTime { get; set; }

    }
}
