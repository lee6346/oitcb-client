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
    
    public class ChannelRepository: IChannelRepository
    {

        private readonly DatabaseContext _context;

        public ChannelRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<ChannelDTO> CreateChannel(ConversationDTO ch)
        {
            var channel = new Channel
            {
                ConversationId = ch.ConversationId,
                BotHandle = "AskRowdy",
                DateTimeCreated = DateTime.Now
            };
            try
            {
                _context.Add(channel);
                await _context.SaveChangesAsync();
                return new ChannelDTO { ChannelStatus = "opened", ConversationId = channel.ConversationId,
                    TimeStamp = channel.DateTimeCreated.ToString() };
            }
            catch (DbUpdateException)
            {
                return new ChannelDTO { ChannelStatus = "dbError" };
            }
        }

        public async Task<ChannelDTO> EndChannel(CloseChannelDTO ch)
        {
            var channel = await _context.Channels
                .SingleOrDefaultAsync(s => s.ConversationId == ch.ConversationId);
            if(channel == null)
            {
                return new ChannelDTO { ChannelStatus = "inputError" };
            }
            if(channel.DateTimeEnded != null)
            {
                return new ChannelDTO { ChannelStatus = "inputError" };
            }
            try
            {
                channel.DateTimeEnded = DateTime.Now;
                _context.Channels.Update(channel);
                await _context.SaveChangesAsync();
                return new ChannelDTO { ChannelStatus = "closed", ConversationId = ch.ConversationId,
                    TimeStamp = channel.DateTimeEnded.ToString() };
            }
            catch (DbUpdateConcurrencyException)
            {
                return new ChannelDTO { ChannelStatus = "concurrencyError" };
            }
            catch (DbUpdateException)
            {
                return new ChannelDTO { ChannelStatus = "dbError" };
            }
        }

        public async Task<List<ChannelDataDTO>> GetChannels()
        {
            var channels = await _context.Channels
                .Where(p => p.DateTimeEnded != null)
                .Select(p => new ChannelDataDTO
                {
                    ConversationId = p.ConversationId,
                    BotHandle = p.BotHandle,
                    DateTimeCreated = p.DateTimeCreated.ToString(),
                    DateTimeEnded = p.DateTimeEnded.ToString()
                }).ToListAsync();
            
            return channels;
        }

        public async Task<List<ChannelDTO>> GetOpenChannels()
        {
            var channels = await _context.Channels
                .Where(p => p.DateTimeEnded == null)
                .Select(p => new ChannelDTO
                {
                    ChannelStatus = "opened",
                    ConversationId = p.ConversationId,
                    TimeStamp = p.DateTimeCreated.ToString()
                }).ToListAsync();

            return channels;
        }

        public int OpenChannelCount()
        {
            var OpenChannelCount = _context.Channels.Count(k => k.DateTimeEnded == null);
            return OpenChannelCount;
        }
        
    }
}
