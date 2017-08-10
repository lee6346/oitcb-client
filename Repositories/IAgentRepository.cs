using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IAgentRepository
    {
        Task<AgentCreateStatusDTO> CreateAgent(AgentRegisterDTO ag);
        Task<AgentUpdateStatusDTO> UpdateAgent(AgentUpdateDTO ag);
        Task<AgentLoginStatusDTO> AgentLogin(AgentLoginDTO ag);
        Task<AgentRemoveStatusDTO> RemoveAgent(AgentRemoveDTO ag);
        Task<List<AgentDTO>> GetAgents();
    }
}
