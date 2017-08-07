using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public enum Status
    {
        Available,
        Unavailable,
        ConnectionError,
        Waiting,


    }
    public class RequestStatusDTO
    {

        public string LiveStatus { get; set; }
    }

}
