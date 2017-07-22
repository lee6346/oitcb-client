using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using chatbot_portal.Models.ConfigModels;
using chatbot_portal.Interfaces;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Collections;

namespace chatbot_portal.Services
{
    
    public class SecretTokenService : ISecretTokenService
    {
        private readonly ChatBotOptions _options;
        
        public SecretTokenService(IOptions<ChatBotOptions> optionsAccessor)
        {
            _options = optionsAccessor.Value;
 
           
        }
        public async Task<IEnumerable> GetConversationAsync()
        {
            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _options.Secret);
                var res = await client.PostAsync(_options.TokenUri, null);

                var stringRes = await res.Content.ReadAsStringAsync();
                var posts = JsonConvert.DeserializeObject<IEnumerable<ConversationObject>>(stringRes);
                
                if (res.StatusCode == HttpStatusCode.Forbidden)
                {
                    return null;
                }
                return posts;

            }
        }

        public async Task<object> GetTokenAsync() {
            var conv_string = await GetConversationAsync();

            if (conv_string == null)
            {
                return null;
            }

            ConversationObject obj = JsonConvert.DeserializeObject<ConversationObject>("hello");
            if(obj.token == null)
            {
                return null;
            }

            return new { token = obj.token };

        }
        public object GetSecret()
        {
            return new { secret = _options.Secret };
        }
    }

    public class ConversationObject
    {
        public string conversationId { get; set; }
        public string token { get; set; }
        public int expires_in { get; set; }

    }

    public class TokenObject
    {
        public string token { get; set; }  
    }

    public class SecretObject
    {
        public string secret { get; set; }
    }

   
}
