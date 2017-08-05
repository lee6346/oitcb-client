using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using chatbot_portal.Data;

namespace chatbot_portal.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20170804181525_Create_Agent_AgentRequest_MessageActivity")]
    partial class Create_Agent_AgentRequest_MessageActivity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("chatbot_portal.Models.Agent", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateTimeCreated")
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<DateTime>("DateTimeUpdated")
                        .IsConcurrencyToken()
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "AgentID");

                    b.HasAlternateKey("UserName")
                        .HasAnnotation("SqlServer:Clustered", false);

                    b.ToTable("AGENT");
                });

            modelBuilder.Entity("chatbot_portal.Models.AgentRequest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("AgentId");

                    b.Property<string>("ConversationId")
                        .IsRequired();

                    b.Property<DateTime>("DateTimeAccepted")
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<DateTime>("DateTimeRequested")
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("UserId")
                        .HasMaxLength(30);

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "AgentRequestID");

                    b.HasIndex("AgentId");

                    b.HasIndex("ConversationId");

                    b.ToTable("AGENT_REQUEST");
                });

            modelBuilder.Entity("chatbot_portal.Models.Channel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("AgentId");

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

                    b.HasIndex("AgentId");

                    b.ToTable("CHANNEL");
                });

            modelBuilder.Entity("chatbot_portal.Models.MessageActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<Guid?>("AgentId");

                    b.Property<string>("ConversationId")
                        .IsRequired();

                    b.Property<DateTime>("DateTimeSent")
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<Guid>("SenderId");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "MessageActivityID");

                    b.HasIndex("AgentId");

                    b.HasIndex("ConversationId");

                    b.ToTable("MESSAGE_ACTIVITY");
                });

            modelBuilder.Entity("chatbot_portal.Models.AgentRequest", b =>
                {
                    b.HasOne("chatbot_portal.Models.Agent", "Agent")
                        .WithMany("AgentRequests")
                        .HasForeignKey("AgentId");

                    b.HasOne("chatbot_portal.Models.Channel", "Channel")
                        .WithMany("AgentRequests")
                        .HasForeignKey("ConversationId")
                        .HasPrincipalKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("chatbot_portal.Models.Channel", b =>
                {
                    b.HasOne("chatbot_portal.Models.Agent")
                        .WithMany("Channels")
                        .HasForeignKey("AgentId");
                });

            modelBuilder.Entity("chatbot_portal.Models.MessageActivity", b =>
                {
                    b.HasOne("chatbot_portal.Models.Agent", "Agent")
                        .WithMany("MessageActivities")
                        .HasForeignKey("AgentId");

                    b.HasOne("chatbot_portal.Models.Channel", "Channel")
                        .WithMany("MessageActivities")
                        .HasForeignKey("ConversationId")
                        .HasPrincipalKey("ConversationId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
