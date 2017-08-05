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

            if (context.MessageActivities.Any())
            {
                return;
            }

            var msgs = new MessageActivity[]
            {
                new MessageActivity{ConversationId="lkjdsoise",SenderId="testomg",Text="haha",DateTimeSent="2016-10-19T20:17:52.2891902Z"},

            };

            foreach (MessageActivity a in msgs)
            {
                context.MessageActivities.Add(a);
            }
            context.SaveChanges();

            if (context.AgentRequests.Any())
            {
                return;
            }

            var agentreqs = new AgentRequest[]
            {
                new AgentRequest{UserId="testing",ConversationId="lkjdsoise", DateTimeRequested="2016-10-19T20:17:52.2891902Z"},

            };

            foreach (AgentRequest a in agentreqs)
            {
                context.AgentRequests.Add(a);
            }
            context.SaveChanges();


            if (context.Agents.Any())
            {
                return;
            }

            var agents = new Agent[]
            {
                new Agent{Password="jameslee",FirstName="James",LastName="Lee", UserName="JamesLee", DateTimeCreated="2016-10-19T20:17:52.2891902Z"},
                new Agent{Password="marksimmons",FirstName="Mark",LastName="Simmons",UserName="MarkSimmons", DateTimeCreated="2016-10-19T20:17:52.2891902Z"}
            };

            foreach (Agent a in agents)
            {
                context.Agents.Add(a);
            }
            context.SaveChanges();
            

            if (context.Channels.Any())
            {
                return;
            }

            var _Channels = new Channel[]
            {
                new Channel{ConversationId="lkjdsoise",BotHandle="AskRowdy",DateTimeCreated="2016-10-19T20:17:52.2891902Z",DateTimeEnded="2016-11-19T20:17:52.2891902Z"}
            };
            foreach(Channel ch in _Channels)
            {
                context.Channels.Add(ch);
            }
            context.SaveChanges();
            /*
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
            
            */
        }
        
    }
}
