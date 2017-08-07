using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{

    public enum ChannelStatus
    {
        Created,
        Ended,
        IdError,
        ConnectionError,
        TokenError,
        DbConcurrencyError,
        DbError
    }
    public class ChannelStatusDTO
    {
        public ChannelStatus ChannelStatus { get; set; }
    }
}
