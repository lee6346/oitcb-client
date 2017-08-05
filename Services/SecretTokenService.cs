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
using chatbot_portal.Models;

namespace chatbot_portal.Services
{
    
    public class SecretTokenService : ISecretTokenService
    {
        private readonly ChatBotOptions _options;
        public SecretTokenService(IOptions<ChatBotOptions> optionsAccessor)
        {
            _options = optionsAccessor.Value;
 
           
        }
        public async Task<Conversation> GetConversationAsync()
        {
            using (var client = new HttpClient() { BaseAddress = new Uri("https://directline.botframework.com") })
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs");
                HttpResponseMessage res = client.PostAsync("v3/directline/tokens/generate", null).Result;
                var msg = await res.Content.ReadAsStringAsync();
                Conversation c = JsonConvert.DeserializeObject<Conversation>(msg);
                return c;
            }
        }

        public async Task<NewConnection> GetConnectionStreamAsync(string id)
        {
            using(var client = new HttpClient() { BaseAddress = new Uri("https://directline.botframework.com") })
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs");
                HttpResponseMessage res = await client.GetAsync("v3/directline/conversations/" + id);

                var data = await res.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<NewConnection>(data);
                //return nc;
            }
        } 

        public object GetSecret()
        {
            return new { secret = _options.Secret };
        }
    }
   
}
