using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Repositories
{
    interface IChannelRepository<Channel>
    {
        void CreateChannel(Channel ch);
        void EndChannel();
        Channel GetChannelByConversationID(string cid);
    }
}
