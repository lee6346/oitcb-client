using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class LiveRequest
    {
        
        public string conv_id { get; set; }
        public string action { get; set; }
        public string date { get; set; }
        public string user { get; set; }

        /*
        public override string ToString()
        {
            //return "{ conv_id: " + conv_id + ", "
        }
        */
    }
}
