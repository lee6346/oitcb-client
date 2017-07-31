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

            
            if (context.LiveRequests.Any())
            {
                return;
            }

            var _LiveRequests = new LiveRequest[]
            {
                new LiveRequest{conv_id="1234-s3fg-32f4-23fs",action="request",date="null",user="student"},
                new LiveRequest {conv_id="asd4-s34f-aaf4-2sas",action="request",date="null",user="student" },
                new LiveRequest{conv_id="12s34-s3sfg-32f4-2s3fs",action="request",date="null",user="student"},
                new LiveRequest{conv_id="1as34-s3fg-32f4-23safs",action="request",date="null",user="student"}
            };
            foreach (LiveRequest lr in _LiveRequests)
            {
                context.LiveRequests.Add(lr);
            }
            context.SaveChanges();
            

        }
        
    }
}
