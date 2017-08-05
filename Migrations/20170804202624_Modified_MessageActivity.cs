using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace chatbot_portal.Migrations
{
    public partial class Modified_MessageActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AGENT_REQUEST_AGENT_AgentId",
                table: "AGENT_REQUEST");

            migrationBuilder.DropForeignKey(
                name: "FK_AGENT_REQUEST_CHANNEL_ConversationId",
                table: "AGENT_REQUEST");

            migrationBuilder.DropForeignKey(
                name: "FK_CHANNEL_AGENT_AgentId",
                table: "CHANNEL");

            migrationBuilder.DropForeignKey(
                name: "FK_MESSAGE_ACTIVITY_AGENT_AgentId",
                table: "MESSAGE_ACTIVITY");

            migrationBuilder.DropForeignKey(
                name: "FK_MESSAGE_ACTIVITY_CHANNEL_ConversationId",
                table: "MESSAGE_ACTIVITY");

            migrationBuilder.DropIndex(
                name: "IX_MESSAGE_ACTIVITY_AgentId",
                table: "MESSAGE_ACTIVITY");

            migrationBuilder.DropIndex(
                name: "IX_MESSAGE_ACTIVITY_ConversationId",
                table: "MESSAGE_ACTIVITY");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_CHANNEL_ConversationId",
                table: "CHANNEL");

            migrationBuilder.DropIndex(
                name: "IX_CHANNEL_AgentId",
                table: "CHANNEL");

            migrationBuilder.DropIndex(
                name: "IX_AGENT_REQUEST_AgentId",
                table: "AGENT_REQUEST");

            migrationBuilder.DropIndex(
                name: "IX_AGENT_REQUEST_ConversationId",
                table: "AGENT_REQUEST");

            migrationBuilder.DropColumn(
                name: "AgentId",
                table: "MESSAGE_ACTIVITY");

            migrationBuilder.DropColumn(
                name: "AgentId",
                table: "CHANNEL");

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "MESSAGE_ACTIVITY",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "AGENT_REQUEST",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddUniqueConstraint(
                name: "AK_CHANNEL_ConversationId",
                table: "CHANNEL",
                column: "ConversationId")
                .Annotation("SqlServer:Clustered", false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropUniqueConstraint(
                name: "AK_CHANNEL_ConversationId",
                table: "CHANNEL");

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "MESSAGE_ACTIVITY",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AgentId",
                table: "MESSAGE_ACTIVITY",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AgentId",
                table: "CHANNEL",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "AGENT_REQUEST",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_CHANNEL_ConversationId",
                table: "CHANNEL",
                column: "ConversationId");

            migrationBuilder.CreateIndex(
                name: "IX_MESSAGE_ACTIVITY_AgentId",
                table: "MESSAGE_ACTIVITY",
                column: "AgentId");

            migrationBuilder.CreateIndex(
                name: "IX_MESSAGE_ACTIVITY_ConversationId",
                table: "MESSAGE_ACTIVITY",
                column: "ConversationId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_AGENT_REQUEST_AGENT_AgentId",
                table: "AGENT_REQUEST",
                column: "AgentId",
                principalTable: "AGENT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AGENT_REQUEST_CHANNEL_ConversationId",
                table: "AGENT_REQUEST",
                column: "ConversationId",
                principalTable: "CHANNEL",
                principalColumn: "ConversationId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CHANNEL_AGENT_AgentId",
                table: "CHANNEL",
                column: "AgentId",
                principalTable: "AGENT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MESSAGE_ACTIVITY_AGENT_AgentId",
                table: "MESSAGE_ACTIVITY",
                column: "AgentId",
                principalTable: "AGENT",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_MESSAGE_ACTIVITY_CHANNEL_ConversationId",
                table: "MESSAGE_ACTIVITY",
                column: "ConversationId",
                principalTable: "CHANNEL",
                principalColumn: "ConversationId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
