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
    public class AgentRequestRepository: IAgentRequestRepository
    {
        private readonly DatabaseContext _context;
        public AgentRequestRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<bool> CreateLiveRequest(AgentRequestDTO req) {

            var request = _context.AgentRequests.FirstOrDefaultAsync(p => p.ConversationId == req.ConversationId);
            if (request == null)
            {
                return false;
            }

            var ar = new AgentRequest
            {
                UserId = req.UserId,
                ConversationId = req.ConversationId,
                DateTimeRequested = DateTime.Now.ToString()//req.SentTime,
            };
            try
            {
                _context.Add(req);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task<bool> UpdateLiveRequest(AgentRequestDTO req) {
            var ar = await _context.AgentRequests.FirstOrDefaultAsync(s => s.ConversationId == req.ConversationId);
            ar.DateTimeAccepted = req.SentTime;
            ar.AgentId = req.UserId;
            try
            {
                _context.Update(ar);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }
        }

        public async Task<List<AgentRequestDTO>> GetPendingRequests()
        {
            var pending = await _context.AgentRequests//.Where(p => p.AgentId == null)
                .Select(p => new AgentRequestDTO
                {
                    ConversationId = p.ConversationId,
                    UserId = p.UserId,
                    Action = "request",
                    SentTime = p.DateTimeRequested
                })
                
                .ToListAsync();
            return pending;
        }
    }
}
