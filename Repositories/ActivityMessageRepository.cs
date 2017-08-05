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
    public class ActivityMessageRepository : IActivityMessageRepository
    {

        private readonly DatabaseContext _dbContext;

        public ActivityMessageRepository(DatabaseContext context)
        {
            _dbContext = context;
        }

        public async Task<bool> StoreMessage(DirectLineActivityDTO msg) {

            var activity = new MessageActivity
            {
                ConversationId = msg.Conversation.ConversationID,
                SenderId = msg.Sender.SenderID,
                Text = msg.Message,
                DateTimeSent = msg.TimeStamp
            };
            
            try
            {
                _dbContext.Add(activity);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                return false;
            }

        }

        public async Task<List<MessageLogDTO>> GetMessageLogByConversation(string ConversationId)
        {
            var messages = await _dbContext.MessageActivities.Where(b => b.ConversationId == ConversationId)
                .Select(p => new MessageLogDTO
                {
                    ConversationId = p.ConversationId,
                    SenderId = p.SenderId,
                    Timestamp = p.DateTimeSent,
                    Text = p.Text
                })
                .OrderBy(p => p.Timestamp)
                .ToListAsync();
            return messages;
        }

        public async Task<List<MessageLogDTO>> GetMessageLogByAgent(string AgentId)
        {
            var messages = await _dbContext.MessageActivities.Where(b => b.SenderId == AgentId)
                .Select(p => new MessageLogDTO
                {
                    ConversationId = p.ConversationId,
                    SenderId = p.SenderId,
                    Timestamp = p.DateTimeSent,
                    Text = p.Text
                })
                .OrderBy(p => p.Timestamp)
                .ToListAsync();
            return messages;
        }
    }
}
