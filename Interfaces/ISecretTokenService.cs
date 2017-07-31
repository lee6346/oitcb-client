using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Collections;
using chatbot_portal.Models;

namespace chatbot_portal.Interfaces
{
    public interface ISecretTokenService
    {
        
        Task<Conversation> GetConversationAsync();
        Task<NewConnection> GetConnectionStreamAsync(string id);
        object GetSecret();
    }
    //create the interfaces for transient, scoped, and singltetons

    public interface ISecretTokenTransient : ISecretTokenService { }

    public interface ISecretTokenScoped : ISecretTokenService { }

    public interface ISecretTokenSingleton : ISecretTokenService { }
    
}
