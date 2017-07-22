using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using chatbot_portal.Models;

namespace chatbot_portal.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DatabaseContext context)
        {
            context.Database.EnsureCreated();


            if (context.Agents.Any())
            {
                return;
            }

            var agents = new Agent[]
            {
                new Agent{Password="jameslee",FirstName="James",LastName="Lee", UserName="JamesLee"},
                new Agent{Password="marksimmons",FirstName="Mark",LastName="Simmons",UserName="MarkSimmons"}
            };

            foreach (Agent a in agents)
            {
                context.Agents.Add(a);
            }
            context.SaveChanges();


            if (context.ConversationQueue.Any())
            {
                return;
            }

            var userQueue = new Conversation[]
            {
                new Conversation{ID="1234-s3fg-32f4-23fs" },
                new Conversation { ID = "asd4-s34f-aaf4-2sas" },
                new Conversation{ID="12s34-s3sfg-32f4-2s3fs"},
                new Conversation{ID="1as34-s3fg-32f4-23safs"},
            };
            foreach (Conversation u in userQueue)
            {
                context.ConversationQueue.Add(u);
            }
            context.SaveChanges();


        }
        
    }
}
