using BigBang_React.Models;
using BigBang_React.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BigBang_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        public IConfiguration _configuration;
        private readonly HospitalContext _context;

        private const string DoctorsRole = "Doctors";
        private const string PatientsRole = "Patients";
        private const string AdminRole = "Admin";
        public TokenController(IConfiguration config, HospitalContext context)
        {
            _configuration = config;
            _context = context;
        }
        [HttpPost("Doctors")]
        public async Task<IActionResult> Post(Doctor _userData)
        {
            if (_userData != null && _userData.Doctor_Name != null && _userData.Password != null)
            {
                var user = await GetUser(_userData.Doctor_Name, _userData.Password);

                if (user != null)
                {
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Doctor_Id", user.Doctor_Id.ToString()),
                        new Claim("Doctor_Name", user.Doctor_Name),
                        new Claim("Password",user.Password),
                        new Claim(ClaimTypes.Role, DoctorsRole)

                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }
        private async Task<Doctor> GetUser(string name, string password)
        {
            return await _context.Doctors.FirstOrDefaultAsync(x => x.Doctor_Name == name && x.Password == password);

        }
        [HttpPost("Patients")]
        public async Task<IActionResult> Post(Patients _userData)
        {
            if (_userData != null && _userData.Patient_Name != null && _userData.Password != null)
            {
                var user = await GetUsers(_userData.Patient_Name, _userData.Password);

                if (user != null)
                {
                    var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("Patient_Id", user.Patient_Id.ToString()),
                        new Claim("Patient_Name", user.Patient_Name),
                        new Claim("Password",user.Password),
                        new Claim(ClaimTypes.Role, PatientsRole)

                    };

                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }

        private async Task<Patients> GetUsers(string name, string password)
        {
            return await _context.Patients.FirstOrDefaultAsync(x => x.Patient_Name == name && x.Password == password);

        }
        [HttpPost("Admin")]
        public async Task<IActionResult> PostStaff(Admin staffData)
        {
            if (staffData != null && !string.IsNullOrEmpty(staffData.Admin_name) && !string.IsNullOrEmpty(staffData.Admin_Password))
            {
                if (staffData.Admin_name == "Pavithra" && staffData.Admin_Password == "Pavi@123")
                {
                    var claims = new[]
                    {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Admin_Id", "1"), // Set the admin ID accordingly
                new Claim("Admin_name", staffData.Admin_name),
                new Claim("Admin_Password", staffData.Admin_Password),
                new Claim(ClaimTypes.Role, AdminRole)
            };
                    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
                    var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                    var token = new JwtSecurityToken(
                        _configuration["Jwt:ValidIssuer"],
                        _configuration["Jwt:ValidAudience"],
                        claims,
                        expires: DateTime.UtcNow.AddDays(1),
                        signingCredentials: signIn);

                    return Ok(new JwtSecurityTokenHandler().WriteToken(token));
                }
                else
                {
                    return BadRequest("Invalid credentials");
                }
            }
            else
            {
                return BadRequest();
            }
        }


        private async Task<Admin> GetStaff(string adminName, string adminPassword)
        {
            return await _context.Admins.FirstOrDefaultAsync(s => s.Admin_name == adminName && s.Admin_Password == adminPassword);
        }
    }

}

