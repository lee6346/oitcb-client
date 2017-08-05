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
        //public DbSet<LiveRequest> LiveRequests { get; set; }
        public DbSet<MessageActivity> MessageActivities { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<AgentRequest> AgentRequests { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            OnChannelCreating(modelBuilder);
            OnAgentCreating(modelBuilder);
            OnAgentRequestCreating(modelBuilder);
            OnMessageActivityCreating(modelBuilder);
            //modelBuilder.Entity<LiveRequest>().ToTable("LIVEREQUEST");


            /*
            modelBuilder.Entity<LiveRequest>().Property(b => b.conv_id).HasColumnName("ConversationID");
            modelBuilder.Entity<LiveRequest>().Property(b => b.action).HasColumnName("Action");
            modelBuilder.Entity<LiveRequest>().Property(b => b.date).HasColumnName("Date");
            modelBuilder.Entity<LiveRequest>().Property(b => b.user).UseSqlServerIdentityColumn().HasColumnName("User");
            
            */
            


        }
        
        public void OnAgentCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>().ToTable("AGENT")
                .Ignore(b => b.DateFormatter);

            modelBuilder.Entity<Agent>().HasKey(b => b.Id)
                .ForSqlServerHasName("AgentID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<Agent>().HasAlternateKey(b => b.UserName)
                .ForSqlServerIsClustered(false);

            modelBuilder.Entity<Agent>().Property(b => b.UserName)
                .HasMaxLength(30);

            modelBuilder.Entity<Agent>().Property(b => b.Password)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<Agent>().Property(b => b.FirstName)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<Agent>().Property(b => b.LastName)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<Agent>().Property(b => b.DateTimeCreated)
                .ForSqlServerHasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<Agent>().Property(b => b.DateTimeUpdated)
                .ForSqlServerHasColumnType("datetime2")
                .IsConcurrencyToken();
            

        }
        
        
        public void OnMessageActivityCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MessageActivity>().ToTable("MESSAGE_ACTIVITY")
                .Ignore(b => b.DateFormatter);

            modelBuilder.Entity<MessageActivity>().HasKey(b => b.Id)
                .ForSqlServerHasName("MessageActivityID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<MessageActivity>().Property(m => m.ConversationId)
                .HasMaxLength(30)
                .IsRequired();
                
            modelBuilder.Entity<MessageActivity>().Property(m => m.Text)
                .HasMaxLength(200)
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.SenderId)
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.DateTimeSent).HasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();


        }

        public void OnChannelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Channel>().ToTable("CHANNEL")
                .Ignore(b => b.DateFormatter);

            modelBuilder.Entity<Channel>().HasKey(b => b.Id)
                .ForSqlServerHasName("ChannelID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<Channel>().HasAlternateKey(b => b.ConversationId)
                .ForSqlServerIsClustered(false);

            modelBuilder.Entity<Channel>().Property(m => m.BotHandle)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.DateTimeCreated)
                .HasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.DateTimeEnded)
                .HasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();


        }
        
        public void OnAgentRequestCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AgentRequest>().ToTable("AGENT_REQUEST")
                .Ignore(b => b.DateFormatter);

            modelBuilder.Entity<AgentRequest>().HasKey(b => b.Id)
                .ForSqlServerHasName("AgentRequestID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<AgentRequest>().Property(b => b.UserId)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.ConversationId)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<AgentRequest>().Property(p => p.DateTimeRequested)
                .ForSqlServerHasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<AgentRequest>().Property(p => p.DateTimeAccepted)
                .ForSqlServerHasColumnType("datetime2");

            modelBuilder.Entity<AgentRequest>().Property(m => m.AgentId)
                .HasMaxLength(30);

            modelBuilder.Entity<AgentRequest>().Property(p => p.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();

        }
        
        /*
       
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
        
    */
    
       
    }
}
