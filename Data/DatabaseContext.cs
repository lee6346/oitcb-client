using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using chatbot_portal.Models;
namespace chatbot_portal.Data
{
    public class DatabaseContext : DbContext
    {

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        { }
        public DbSet<Agent> Agents { get; set; }
        public DbSet<Conversation> ConversationQueue { get; set; }
       // public DbSet<LiveRequest> LiveRequests { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>().ToTable("_AGENT");
            modelBuilder.Entity<Conversation>().ToTable("_USERQUEUE");
           // modelBuilder.Entity<LiveRequest>().ToTable("LIVEREQUEST");
           // modelBuilder.Entity<LiveRequest>().Property(lr => lr.RequestMade).HasDefaultValueSql("getdate()");
           // modelBuilder.Entity<LiveRequest>().Property(lr => lr.RequestAccepted).HasDefaultValueSql("getdate()");



        } 

        public async Task<Agent> GetAgent(string user, string pass)
        {
            var agent = await this.Agents.FirstOrDefaultAsync(s => s.UserName == user && s.Password == pass);
            return agent;
        }

        public async Task<bool> RequestPending(string conv_id)
        {
            var req = await this.ConversationQueue.FirstOrDefaultAsync(s => s.ID == conv_id);
            if(req == null)
            {
                
                try
                {
                    this.Add(new Conversation { ID = conv_id });
                    await this.SaveChangesAsync();
                    return true;
                }
                catch (DbUpdateException)
                {
                    //log
                    
                }
            }
            return false;
        }
        // returns a matching conversation or null if non exists
        public async Task<Conversation> GetRequest(string conv_id)
        {
            var req = await this.ConversationQueue.FirstOrDefaultAsync(s => s.ID == conv_id);
            return req;
        }

        // removes a conversation from the pending queue 
        public async Task<bool> DeleteRequest(string conv_id)
        {
            var liverequest = await this.ConversationQueue.SingleOrDefaultAsync(m => m.ID == conv_id);
            if(liverequest == null)
            {
                return false;
            }
            try
            {
                this.ConversationQueue.Remove(liverequest);
                await this.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateException)
            {
                //log
                return false;
            }
        }
        

    
       
    }
}
