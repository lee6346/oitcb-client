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
        public DbSet<UserQueue> UserQueue { get; set; }
        //map dbset names to the table names in the db
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agent>().ToTable("AGENT");
            modelBuilder.Entity<UserQueue>().ToTable("USERQUEUE");
        }

       
    }
}
