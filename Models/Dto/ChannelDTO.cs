using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class ChannelDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("expires_in")]
        public int Expiration { get; set; }
        [JsonProperty("streamUrl")]
        public string StreamUrl { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }

    }

    public class ChannelConnectionDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("token")]
        public string Token { get; set; }
        [JsonProperty("streamUrl")]
        public string StreamUrl { get; set; }
    }

    public class OpenedChannelDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("createdAt")]
        public string DateTimeCreated { get; set; }
    }

    public class CloseChannelDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
    }

    public class ChannelDataDTO
    {
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("botHandle")]
        public string BotHandle { get; set; }
        [JsonProperty("createdAt")]
        public string DateTimeCreated { get; set; }
        [JsonProperty("endedAt")]
        public string DateTimeEnded { get; set; }
    }


}
