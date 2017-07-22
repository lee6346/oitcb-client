using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading.Tasks;
using WebSocketManager;
using WebSocketManager.Common;

namespace chatbot_portal.Services
{
    public class LiveRequestService : WebSocketHandler
    {
      
        public LiveRequestService(WebSocketConnectionManager webSocketConnectionManager) : base(webSocketConnectionManager)
        {
        }

        
        


        public bool IsWebSocket(HttpContext context)
        {
            if (!context.WebSockets.IsWebSocketRequest)
            {
                return false;
            }
            return true;
        }
        
        public string GetSocketId(WebSocket socket)
        {
            return WebSocketConnectionManager.GetId(socket);
        }

        public WebSocket GetSocket(string id)
        {
            return WebSocketConnectionManager.GetSocketById(id);
        }

        public int AgentsAvailable()
        {
            return WebSocketConnectionManager.GetAll().Count();
        }
        

        

    }
}
