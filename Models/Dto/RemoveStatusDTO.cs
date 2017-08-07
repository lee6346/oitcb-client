using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models.Dto
{
    public enum RemoveStatus
    {
        Removed,
        Empty,
        ConcurrencyError,
        RemoveError
    }
    public class RemoveStatusDTO
    {
        [JsonConverter(typeof(StringEnumConverter))]
        public RemoveStatus RemoveStatus { get; set; }
    }
}
