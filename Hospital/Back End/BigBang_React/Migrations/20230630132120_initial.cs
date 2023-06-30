using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BigBang_React.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients");

            migrationBuilder.AlterColumn<int>(
                name: "Doctor_Id",
                table: "Patients",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients",
                column: "Doctor_Id",
                principalTable: "Doctors",
                principalColumn: "Doctor_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients");

            migrationBuilder.AlterColumn<int>(
                name: "Doctor_Id",
                table: "Patients",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_Doctors_Doctor_Id",
                table: "Patients",
                column: "Doctor_Id",
                principalTable: "Doctors",
                principalColumn: "Doctor_Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
