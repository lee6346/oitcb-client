using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Http;
using System.Collections;

namespace chatbot_portal.Interfaces
{
    public interface ISecretTokenService
    {
        Task<object> GetTokenAsync();
        Task<IEnumerable> GetConversationAsync();
        object GetSecret();
    }
    //create the interfaces for transient, scoped, and singltetons

    public interface ISecretTokenTransient : ISecretTokenService { }

    public interface ISecretTokenScoped : ISecretTokenService { }

    public interface ISecretTokenSingleton : ISecretTokenService { }
    
}
