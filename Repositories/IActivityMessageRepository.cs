using chatbot_portal.Models;
using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IActivityMessageRepository
    {
        Task<bool> StoreMessage(DirectLineActivityDTO msg);

        Task<List<MessageLogDTO>> GetMessageLogByConversation(string ConversationId);

        Task<List<MessageLogDTO>> GetMessageLogByAgent(string AgentId);

    }


}
