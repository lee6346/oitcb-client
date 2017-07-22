using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.ConfigModels
{
    public class ChatBotOptions
    {
        public ChatBotOptions()
        {
            TokenUri = "https://directline.botframework.com/v3/directline/tokens/generate";
            Secret = "gD8hMWEV0fM.cwA.x-U.EQEmjSeulWq60J-PHoJyD9sDeUIzOGNs5xIkKCxRxYs";
        }
        public string Secret { get; set; }
        public string TokenUri { get; set; }

    }
}
