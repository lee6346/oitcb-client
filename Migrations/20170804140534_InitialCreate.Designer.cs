using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using chatbot_portal.Data;

namespace chatbot_portal.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20170804140534_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("chatbot_portal.Models.Channel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BotHandle")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("ConversationId")
                        .IsRequired();

                    b.Property<string>("DateTimeCreated")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<string>("DateTimeEnded")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "ChannelID");

                    b.HasAlternateKey("ConversationId")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("CHANNEL");
                });
        }
    }
}
