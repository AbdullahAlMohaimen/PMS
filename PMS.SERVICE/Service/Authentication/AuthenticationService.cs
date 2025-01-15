using PMS.BO;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;

namespace PMS.SERVICE
{
	public class AuthenticationService
	{
		private readonly IConfiguration _configuration;
		public AuthenticationService() { }
		public AuthenticationService(IConfiguration configuration)
		{
			_configuration = configuration;
		}
		#region Token Generate
		public string CreateToken(PMS.BO.User oUser)
		{
			var jwtConfig = _configuration.GetSection("Jwt");
			var claims = new[] {
				new Claim(JwtRegisteredClaimNames.Sub, jwtConfig["Subject"]),
				new Claim("Email", oUser.Email),
				new Claim("Name", oUser.Name),
				new Claim("Role", oUser.Role),
				new Claim("Language", oUser.Language),
				new Claim("Id", oUser.Id.ToString()),
			};
			var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig["Key"]));
			var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
			var token = new JwtSecurityToken(jwtConfig["Issuer"], jwtConfig["Audience"],
				claims,
				expires: DateTime.UtcNow.AddDays(1),
				signingCredentials: signIn
			);
			var userJWTToken = new JwtSecurityTokenHandler().WriteToken(token);
			return userJWTToken;
		}
		#endregion
	}
}
