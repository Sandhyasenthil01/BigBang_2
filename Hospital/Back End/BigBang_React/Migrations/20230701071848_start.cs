using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BigBang_React.Migrations
{
    /// <inheritdoc />
    public partial class start : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "Doctors");

            migrationBuilder.AlterColumn<int>(
                name: "Doctor_Id",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "status",
                table: "Doctors",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients",
                column: "Doctor_Id",
                principalTable: "Doctors",
                principalColumn: "Doctor_Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "status",
                table: "Doctors");

            migrationBuilder.AlterColumn<int>(
                name: "Doctor_Id",
                table: "Patients",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "Doctors",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients",
                column: "Doctor_Id",
                principalTable: "Doctors",
                principalColumn: "Doctor_Id");
        }
    }
}
