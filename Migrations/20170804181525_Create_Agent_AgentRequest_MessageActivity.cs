using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace chatbot_portal.Migrations
{
    public partial class Create_Agent_AgentRequest_MessageActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AgentId",
                table: "CHANNEL",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AGENT",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DateTimeCreated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTimeUpdated = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FirstName = table.Column<string>(maxLength: 30, nullable: false),
                    LastName = table.Column<string>(maxLength: 30, nullable: false),
                    Password = table.Column<string>(maxLength: 30, nullable: false),
                    UserName = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("AgentID", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                    table.UniqueConstraint("AK_AGENT_UserName", x => x.UserName)
                        .Annotation("SqlServer:Clustered", false);
                });

            migrationBuilder.CreateTable(
                name: "AGENT_REQUEST",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AgentId = table.Column<Guid>(nullable: true),
                    ConversationId = table.Column<string>(nullable: false),
                    DateTimeAccepted = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateTimeRequested = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    UserId = table.Column<Guid>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("AgentRequestID", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_AGENT_REQUEST_AGENT_AgentId",
                        column: x => x.AgentId,
                        principalTable: "AGENT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AGENT_REQUEST_CHANNEL_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "CHANNEL",
                        principalColumn: "ConversationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MESSAGE_ACTIVITY",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AgentId = table.Column<Guid>(nullable: true),
                    ConversationId = table.Column<string>(nullable: false),
                    DateTimeSent = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RowVersion = table.Column<byte[]>(rowVersion: true, nullable: true),
                    SenderId = table.Column<Guid>(nullable: false),
                    Text = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("MessageActivityID", x => x.Id)
                        .Annotation("SqlServer:Clustered", true);
                    table.ForeignKey(
                        name: "FK_MESSAGE_ACTIVITY_AGENT_AgentId",
                        column: x => x.AgentId,
                        principalTable: "AGENT",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MESSAGE_ACTIVITY_CHANNEL_ConversationId",
                        column: x => x.ConversationId,
                        principalTable: "CHANNEL",
                        principalColumn: "ConversationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CHANNEL_AgentId",
                table: "CHANNEL",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENT_REQUEST_AgentId",
                table: "AGENT_REQUEST",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_AGENT_REQUEST_ConversationId",
                table: "AGENT_REQUEST",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_MESSAGE_ACTIVITY_AgentId",
                table: "MESSAGE_ACTIVITY",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_MESSAGE_ACTIVITY_ConversationId",
                table: "MESSAGE_ACTIVITY",
                column: "ConversationId");

            migrationBuilder.AddForeignKey(
                name: "FK_CHANNEL_AGENT_AgentId",
                table: "CHANNEL",
                column: "AgentId",
                principalTable: "AGENT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CHANNEL_AGENT_AgentId",
                table: "CHANNEL");

            migrationBuilder.DropTable(
                name: "AGENT_REQUEST");

            migrationBuilder.DropTable(
                name: "MESSAGE_ACTIVITY");

            migrationBuilder.DropTable(
                name: "AGENT");

            migrationBuilder.DropIndex(
                name: "IX_CHANNEL_AgentId",
                table: "CHANNEL");

            migrationBuilder.DropColumn(
                name: "AgentId",
                table: "CHANNEL");
        }
    }
}
