using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IChannelRepository
    {
        Task<ChannelDTO> CreateChannel(ConversationDTO ch);
        Task<ChannelDTO> EndChannel(CloseChannelDTO cch);
        Task<List<ChannelDataDTO>> GetChannels();
        Task<List<ChannelDTO>> GetOpenChannels();
        int OpenChannelCount();

    }
}
