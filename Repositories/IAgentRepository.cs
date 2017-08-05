using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public interface IAgentRepository<Agent>
    {
        void CreateAgent(Agent ag);
        void UpdateAgent(Agent ag);
        void RemoveAgent(Guid aid);

        Agent GetAgentById(Guid id);
        Agent GetAgentByUserName(string user);

        List<Agent> GetAgents();

    }
}
