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
        public DbSet<MessageActivity> MessageActivities { get; set; }
        public DbSet<Channel> Channels { get; set; }
        public DbSet<AgentRequest> AgentRequests { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            OnChannelCreating(modelBuilder);
            OnAgentCreating(modelBuilder);
            OnAgentRequestCreating(modelBuilder);
            OnMessageActivityCreating(modelBuilder);

        }
        
        public void OnAgentCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>().ToTable("AGENT");

            modelBuilder.Entity<Agent>().HasKey(b => b.Id)
                .ForSqlServerHasName("AgentID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<Agent>().HasAlternateKey(b => b.UserName)
                .ForSqlServerIsClustered(false);

            modelBuilder.Entity<Agent>().Property(b => b.UserName)
                .HasMaxLength(30)
                .IsRequired();

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
            modelBuilder.Entity<MessageActivity>().ToTable("MESSAGE_ACTIVITY");


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
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.DateTimeSent)
                .HasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<MessageActivity>().Property(m => m.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();


        }

        public void OnChannelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Channel>().ToTable("CHANNEL");


            modelBuilder.Entity<Channel>().HasKey(b => b.Id)
                .ForSqlServerHasName("ChannelID")
                .ForSqlServerIsClustered();

            modelBuilder.Entity<Channel>().HasAlternateKey(b => b.ConversationId)
                .ForSqlServerIsClustered(false);

            modelBuilder.Entity<Channel>().Property(b => b.ConversationId)
                .HasMaxLength(50)
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.BotHandle)
                .HasMaxLength(30)
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.DateTimeCreated)
                .HasColumnType("datetime2")
                .IsRequired();

            modelBuilder.Entity<Channel>().Property(m => m.DateTimeEnded)
                .HasColumnType("datetime2");

            modelBuilder.Entity<Channel>().Property(m => m.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();


        }
        
        public void OnAgentRequestCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AgentRequest>().ToTable("AGENT_REQUEST");

            modelBuilder.Entity<AgentRequest>().HasKey(b => b.Id)
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

            modelBuilder.Entity<AgentRequest>().Property(p => p.RowVersion)
                .ValueGeneratedOnAddOrUpdate()
                .IsConcurrencyToken();

        }
       
    }
}
