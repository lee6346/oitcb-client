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

        public async Task<ChannelStatusDTO> CreateChannel(ChannelDTO ch)
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
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.Created };
            }
            catch (DbUpdateException)
            {
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.DbError };
            }
        }

        public async Task<ChannelStatusDTO> EndChannel(CloseChannelDTO ch)
        {
            var channel = await _context.Channels
                .SingleOrDefaultAsync(s => s.ConversationId == ch.ConversationId);
            if(channel == null)
            {
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.IdError };
            }
            if(channel.DateTimeEnded != null)
            {
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.Ended };
            }
            try
            {
                channel.DateTimeEnded = DateTime.Now;
                _context.Channels.Update(channel);
                await _context.SaveChangesAsync();
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.Ended };
            }
            catch (DbUpdateConcurrencyException)
            {
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.DbConcurrencyError };
            }
            catch (DbUpdateException)
            {
                return new ChannelStatusDTO { ChannelStatus = ChannelStatus.DbError };
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

        public async Task<List<OpenedChannelDTO>> GetOpenChannels()
        {
            var channels = await _context.Channels
                .Where(p => p.DateTimeEnded == null)
                .Select(p => new OpenedChannelDTO
                {
                    ConversationId = p.ConversationId,
                    DateTimeCreated = p.DateTimeCreated.ToString()
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
