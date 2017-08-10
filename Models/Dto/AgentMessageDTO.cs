using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public class AgentMessageDTO
    {

        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("timeStamp")]
        public string TimeStamp { get; set; }
        [JsonProperty("text")]
        public string Text { get; set; }

    }

}
