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
        public DbSet<LiveRequest> LiveRequests { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //model to table name mappings
            modelBuilder.Entity<Agent>().ToTable("_AGENT");
            modelBuilder.Entity<LiveRequest>().ToTable("LIVEREQUEST");

            //property to column mappings
            modelBuilder.Entity<LiveRequest>().Property(b => b.conv_id).HasColumnName("ConversationID");
            modelBuilder.Entity<LiveRequest>().Property(b => b.action).HasColumnName("Action");
            modelBuilder.Entity<LiveRequest>().Property(b => b.date).HasColumnName("Date");
            modelBuilder.Entity<LiveRequest>().Property(b => b.user).HasColumnName("User");


            //Concurrency Token
            /*
            modelBuilder.Entity<LiveRequest>()
                .Property(lr => lr.last_modified)
                .IsConcurrencyToken()
                .ValueGeneratedOnAddOrUpdate();
                */
           // modelBuilder.Entity<LiveRequest>().Property(lr => lr.RequestMade).HasDefaultValueSql("getdate()");
           // modelBuilder.Entity<LiveRequest>().Property(lr => lr.RequestAccepted).HasDefaultValueSql("getdate()");



        } 

        public async Task<Agent> GetAgent(string user, string pass)
        {
            var agent = await this.Agents.FirstOrDefaultAsync(s => s.UserName == user && s.Password == pass);
            return agent;
        }

        public async Task<bool> RequestPending(LiveRequest req)
        {
            var pending_req = await this.LiveRequests.FirstOrDefaultAsync(s => s.conv_id == req.conv_id);
            if(pending_req == null)
            {
                
                try
                {
                    this.Add(req);
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
        public async Task<LiveRequest> GetRequest(string conv_id)
        {
            var req = await this.LiveRequests.FirstOrDefaultAsync(s => s.conv_id == conv_id);
            return req;
        }

        // removes a conversation from the pending queue 
        public async Task<bool> DeleteRequest(string conv_id)
        {
            var liverequest = await this.LiveRequests.SingleOrDefaultAsync(m => m.conv_id == conv_id);
            if(liverequest == null)
            {
                return false;
            }
            try
            {
                this.LiveRequests.Remove(liverequest);
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
