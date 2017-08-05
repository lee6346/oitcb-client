using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace chatbot_portal.Migrations
{
    public partial class Modified_Guid_Properties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "SenderId",
                table: "MESSAGE_ACTIVITY",
                nullable: false,
                oldClrType: typeof(Guid));

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "MESSAGE_ACTIVITY",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "AGENT_REQUEST",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(Guid),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<string>(
                name: "DateTimeAccepted",
                table: "AGENT_REQUEST",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AlterColumn<string>(
                name: "AgentId",
                table: "AGENT_REQUEST",
                maxLength: 30,
                nullable: true,
                oldClrType: typeof(Guid),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DateTimeUpdated",
                table: "AGENT",
                type: "datetime2",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "SenderId",
                table: "MESSAGE_ACTIVITY",
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ConversationId",
                table: "MESSAGE_ACTIVITY",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<Guid>(
                name: "UserId",
                table: "AGENT_REQUEST",
                maxLength: 30,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 30);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTimeAccepted",
                table: "AGENT_REQUEST",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "datetime2",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "AgentId",
                table: "AGENT_REQUEST",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 30,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateTimeUpdated",
                table: "AGENT",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "datetime2",
                oldNullable: true);
        }
    }
}
