using chatbot_portal.Data;
using chatbot_portal.Models;
using chatbot_portal.Models.Dto;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    public class AgentRepository: IAgentRepository
    {

        private readonly DatabaseContext _context;
        public AgentRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<AgentCreateStatusDTO> CreateAgent(AgentRegisterDTO ag)
        {
            if (await _context.Agents.AnyAsync(p => p.UserName == ag.UserName))
            {
                return new AgentCreateStatusDTO { RegisterStatus = "inputError" };
            }
            if (ag.Password != ag.RePassWord)
            {
                return new AgentCreateStatusDTO { RegisterStatus = "inputError" };
            }
            var agent = new Agent
            {
                UserName = ag.UserName,
                Password = ag.Password,
                FirstName = ag.FirstName,
                LastName = ag.LastName,
                DateTimeCreated = DateTime.Now,
                DateTimeUpdated = DateTime.Now
            };
            try
            {
                _context.Add(agent);
                await _context.SaveChangesAsync();
                return new AgentCreateStatusDTO { RegisterStatus = "complete" };
            }
            catch (DbUpdateException)
            {
                return new AgentCreateStatusDTO { RegisterStatus = "dbError" };
            }
        }
        public async Task<AgentUpdateStatusDTO> UpdateAgent(AgentUpdateDTO ag)
        {
            var agent = await _context.Agents.FirstOrDefaultAsync(b => b.UserName == ag.OldUserName);
            if(agent == null)
            {
                return new AgentUpdateStatusDTO { UpdateStatus = "inputError" };
            }
            if (ag.UserName != null) agent.UserName = ag.UserName;
            if (ag.NewPassword != null) agent.Password = ag.NewPassword;
            if (ag.FirstName != null) agent.FirstName = ag.FirstName;
            if (ag.LastName != null) agent.LastName = ag.LastName;
            agent.DateTimeUpdated = DateTime.Now;
            try
            {
                _context.Agents.Update(agent);
                await _context.SaveChangesAsync();
                return new AgentUpdateStatusDTO { UpdateStatus = "complete" };
            }
            catch (DbUpdateConcurrencyException)
            {
                return new AgentUpdateStatusDTO { UpdateStatus = "concurrencyError" };
            }
            catch (DbUpdateException)
            {
                return new AgentUpdateStatusDTO { UpdateStatus = "dbError" };
            }

        }
        public async Task<AgentLoginStatusDTO> AgentLogin(AgentLoginDTO ag)
        {
            if(await _context.Agents.AnyAsync(p => p.UserName == ag.UserName && p.Password == ag.Password))
            {
                return new AgentLoginStatusDTO { LoginStatus = "complete" };
            }
            return new AgentLoginStatusDTO { LoginStatus = "inputError" };

        }
        public async Task<AgentRemoveStatusDTO> RemoveAgent(AgentRemoveDTO ag)
        {
            var agent = await _context.Agents.FirstOrDefaultAsync(p => p.UserName == ag.UserName && p.Password == ag.Password);
            if(agent == null)
            {
                return new AgentRemoveStatusDTO { RemoveStatus = "inputError" };
            }
            try
            {
                _context.Agents.Remove(agent);
                await _context.SaveChangesAsync();
                return new AgentRemoveStatusDTO { RemoveStatus = "complete" };

            }
            catch (DbUpdateConcurrencyException)
            {
                return new AgentRemoveStatusDTO { RemoveStatus = "concurrencyError" };
            }
            catch (DbUpdateException)
            {
                return new AgentRemoveStatusDTO { RemoveStatus = "dbError" };
            }
            
        }
        public async Task<List<AgentDTO>> GetAgents()
        {

            var agents = await _context.Agents.Select(p => new AgentDTO
            {
                Id = p.Id.ToString(),
                UserName = p.UserName,
                FirstName = p.FirstName,
                LastName = p.LastName
            }).ToListAsync();
            return agents;
        }
    }
}
