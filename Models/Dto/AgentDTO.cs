using Newtonsoft.Json;

namespace chatbot_portal.Models.Dto
{
    public class AgentDTO
    {
        [JsonProperty("id")]
        public string Id { get; set; }
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
    }

    public class AgentRegisterDTO
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
        [JsonProperty("re-password")]
        public string RePassWord { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }

    }
    public class AgentLoginDTO
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }
    }

    public class AgentUpdateDTO
    {
        [JsonProperty("oldUserName")]
        public string OldUserName { get; set; }
        [JsonProperty("newUserName")]
        public string UserName { get; set; }
        [JsonProperty("newPassword")]
        public string NewPassword { get; set; }
        [JsonProperty("firstName")]
        public string FirstName { get; set; }
        [JsonProperty("lastName")]
        public string LastName { get; set; }
    }

    public class AgentRemoveDTO
    {
        [JsonProperty("userName")]
        public string UserName { get; set; }
        [JsonProperty("password")]
        public string Password { get; set; }


    }
}
