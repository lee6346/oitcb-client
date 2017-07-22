using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace chatbot_portal.Models
{
    public class Conversation
    {
        [Column("CONVERSATION_ID")]
        public string ID { get; set; }
        //[DataType(DataType.Date)]    => only takes the date, not time, from the DB timestamp
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true}] => display format of the string, in edit mode = format applied
        // in text boxes, etc
        //[Column("TIMESTAMP")]
        //public DateTime RequestTime { get; set; } 
    }
}
