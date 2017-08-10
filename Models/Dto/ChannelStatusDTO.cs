using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{

    public enum ChannelStatus
    {
        Created,
        Ended,
        IdError,
        ConnectionError,
        TokenError,
        DbConcurrencyError,
        DbError
    }
    public class ChannelStatusDTO
    {
        [JsonProperty("channelStatus")]
        public string ChannelStatus { get; set; }
        [JsonProperty("conversationId")]
        public string ConversationId { get; set; }
        [JsonProperty("timeStamp")]
        public string TimeStamp { get; set; }


    }
}
