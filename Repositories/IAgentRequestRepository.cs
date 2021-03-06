﻿
using chatbot_portal.Models;
using chatbot_portal.Models.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IAgentRequestRepository
    {

        Task<RequestStatusDTO> CreateLiveRequest(AgentRequestDTO req);

        Task<RemoveStatusDTO> RemoveLiveRequest(AgentRequestDTO req);

        Task<List<AgentRequestDTO>> GetPendingRequests(); 


    }
}
