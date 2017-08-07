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

        public async Task<RequestStatusDTO> CreateLiveRequest(AgentRequestDTO req) {

            if (await _context.AgentRequests.AnyAsync(b => b.ConversationId == req.ConversationId))
            {
                return new RequestStatusDTO { LiveStatus = "waiting"};
            }

            var ar = new AgentRequest
            {
                UserId = req.UserId,
                ConversationId = req.ConversationId,
                DateTimeRequested = DateTime.Parse(req.SentTime)
            };

            try
            {
                _context.Add(ar);
                await _context.SaveChangesAsync();
                return new RequestStatusDTO { LiveStatus = "available" };
            }

            catch (DbUpdateException)
            {
                return new RequestStatusDTO { LiveStatus = "error" };
            }
        }
        
        public async Task<RemoveStatusDTO> RemoveLiveRequest(AgentRequestDTO req) {
            var ar = await _context.AgentRequests
                .SingleOrDefaultAsync(s => s.ConversationId == req.ConversationId);
            if(ar == null)
            {
                return new RemoveStatusDTO { RemoveStatus = RemoveStatus.Empty };
            }
            try
            {
                _context.AgentRequests.Remove(ar);
                await _context.SaveChangesAsync();
                return new RemoveStatusDTO { RemoveStatus = RemoveStatus.Removed };
            }
            catch (DbUpdateConcurrencyException)
            {
                return new RemoveStatusDTO {RemoveStatus = RemoveStatus.ConcurrencyError };
            }
            catch (DbUpdateException)
            {
                return new RemoveStatusDTO { RemoveStatus = RemoveStatus.RemoveError };
            }

        }
        
        public async Task<List<AgentRequestDTO>> GetPendingRequests()
        {

            var pending = await _context.AgentRequests
                .Select(p => new AgentRequestDTO
                {
                    ConversationId = p.ConversationId,
                    UserId = p.UserId,
                    Action = "request",
                    SentTime = p.DateTimeRequested.ToString()
                }).ToListAsync();

            return pending;
        }
    }
}
