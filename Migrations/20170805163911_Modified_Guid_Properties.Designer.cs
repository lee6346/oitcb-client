using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using chatbot_portal.Data;

namespace chatbot_portal.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20170805163911_Modified_Guid_Properties")]
    partial class Modified_Guid_Properties
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

                    b.Property<string>("DateTimeCreated")
                        .IsRequired()
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<string>("DateTimeUpdated")
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

                    b.Property<string>("AgentId")
                        .HasMaxLength(30);

                    b.Property<string>("ConversationId");

                    b.Property<string>("DateTimeAccepted")
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<string>("DateTimeRequested")
                        .IsRequired()
                        .HasAnnotation("SqlServer:ColumnType", "datetime2");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "AgentRequestID");

                    b.ToTable("AGENT_REQUEST");
                });

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

            modelBuilder.Entity("chatbot_portal.Models.MessageActivity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConversationId")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("DateTimeSent")
                        .IsRequired()
                        .HasColumnType("datetime2");

                    b.Property<byte[]>("RowVersion")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate();

                    b.Property<string>("SenderId")
                        .IsRequired();

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("Id")
                        .HasAnnotation("SqlServer:Clustered", true)
                        .HasAnnotation("SqlServer:Name", "MessageActivityID");

                    b.ToTable("MESSAGE_ACTIVITY");
                });
        }
    }
}
