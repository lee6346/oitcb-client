using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class Agent
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string DateTimeCreated { get; set; }
        public string DateTimeUpdated { get; set; }

        public DateTime DateFormatter { get; set; }




    }
}
