using Newtonsoft.Json;

namespace chatbot_portal.Models.Dto
{
    public class AgentCreateStatusDTO
    {
        [JsonProperty("registerStatus")]
        public string RegisterStatus;
    }

    public class AgentLoginStatusDTO
    {   
        [JsonProperty("loginStatus")]
        public string LoginStatus;
    }

    public class AgentUpdateStatusDTO
    {
        [JsonProperty("updateStatus")]
        public string UpdateStatus;
    }
    public class AgentRemoveStatusDTO
    {
        [JsonProperty("removeStatus")]
        public string RemoveStatus;
    }

    public class AgentQueryStatusDTO
    {
        [JsonProperty("queryStatus")]
        public string QueryStatus;
    }
}
