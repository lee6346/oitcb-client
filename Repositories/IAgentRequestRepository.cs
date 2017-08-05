
using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IAgentRequestRepository
    {

        Task<bool> CreateLiveRequest(AgentRequestDTO req);

        Task<bool> UpdateLiveRequest(AgentRequestDTO req);

        Task<List<AgentRequestDTO>> GetPendingRequests(); 


    }
}
