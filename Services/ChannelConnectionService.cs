using chatbot_portal.Models.ConfigModels;
using chatbot_portal.Models.Dto;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace chatbot_portal.Services
{
    public class ChannelConnectionService: IChannelConnectionService
    {

        private readonly ChatBotOptions _options;
        public ChannelConnectionService(IOptions<ChatBotOptions> optionsAccessor)
        {
            _options = optionsAccessor.Value;

        }

        public async Task<ConversationDTO> RequestNewChannelAsync()
        {
            using (var client = new HttpClient() { BaseAddress = new Uri("https://directline.botframework.com") })
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs");
                HttpResponseMessage res = client.PostAsync("v3/directline/tokens/generate", null).Result;
                var msg = await res.Content.ReadAsStringAsync();
                ConversationDTO c = JsonConvert.DeserializeObject<ConversationDTO>(msg);
                return c;
            }
        }
        public async Task<ConnectionDTO> RequestNewConnectionAsync(string conv_id)
        {
            using (var client = new HttpClient() { BaseAddress = new Uri("https://directline.botframework.com") })
            {
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs");
                HttpResponseMessage res = await client.GetAsync("v3/directline/conversations/" + conv_id);

                var data = await res.Content.ReadAsStringAsync();

                return JsonConvert.DeserializeObject<ConnectionDTO>(data);
            }
        }
    }
}
