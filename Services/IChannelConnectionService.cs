using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Services
{
    public interface IChannelConnectionService
    {
        Task<ChannelDTO> RequestNewChannelAsync();
        Task<ChannelConnectionDTO> RequestNewConnectionAsync(string conv_id);
    }

}
