using System;
using System.Collections.Generic;
using System.Data;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Globalization;
using Microsoft.Extensions.Options;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Microsoft.Extensions.Configuration;
using PMS.BO;
using PMS.SERVICE;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static Microsoft.ApplicationInsights.MetricDimensionNames.TelemetryContext;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Components.Routing;


namespace PMS.Controllers
{
	[Route("api/Authentication")]
	[ApiController]
	[Authorize]
	public class AuthController : ControllerBase
	{
		#region VARIABLE && SERVICE DECLEARE
		public readonly IConfiguration _configuration;
		public readonly IUserService _userService;
		public AuthController(IConfiguration configuration, IUserService userService)
		{
			_configuration = configuration;
			this._userService = userService;
		}
		#endregion

		#region LOGIN
		[HttpPost("login")]
		[AllowAnonymous]
		public async Task<IActionResult> LOGIN(PMS.BO.LoginRequest oLoginRequest)
		{
			PMS.BO.User oUser = new PMS.BO.User();
			AuthPassword oAuthPassword = new AuthPassword();
			string json = "";
			try
			{
				if (oLoginRequest.AuthorityType == EnumLoginType.Normal)
				{
					if (oLoginRequest.IsForSignIN == true)
					{
						if (oLoginRequest.IsSSO == true)
						{
							oUser = await _userService.GetByEmail(oLoginRequest.Email);
						}
						else
						{
							oUser = await _userService.GetByEmail(oLoginRequest.Email);
							if (oUser != null)
							{
								if (oUser.Password != "" && oUser.Solt != "")
								{
									if (!oAuthPassword.AreEqual(oLoginRequest.Password, oUser.Password, oUser.Solt))
									{
										throw new Exception("Wrong Password!\nPlease enter correct password");
									}
								}
								else
								{
									throw new Exception("Something proglem, please try again later.");
								}
							}
							else
							{
								throw new Exception("No account found for this email. Don't worry! You can easily create an account by signing up.");
							}
						}
					}
					else if(oLoginRequest.IsForSignIN == false)
					{
						oUser = await _userService.GetByEmail(oLoginRequest.Email);
						if (oUser != null)
						{
							throw new Exception("Oops! The email you entered is already registered. Please try logging in or use a different email to sign up.");
						}
						else
						{
							PMS.BO.User savedUser = new PMS.BO.User(oLoginRequest);
							await _userService.Save(savedUser);
							oUser = await _userService.GetByEmail(oLoginRequest.Email);
						}
					}
				}
				else
				{
					oUser = await _userService.GetByEmail(oLoginRequest.Email);
					if(oUser == null)
					{
						PMS.BO.User savedUser = new PMS.BO.User(oLoginRequest);
						await _userService.Save(savedUser);
						oUser = await _userService.GetByEmail(oLoginRequest.Email);
					}
				}
				if (oUser == null)
				{
					throw new Exception("Something proglem, please try again later.");
				}
				string userToken = new AuthenticationService(_configuration).CreateToken(oUser);
				if (userToken != null)
				{
					HttpContext.Session.SetString("JWToken", userToken);
				}
				json = JsonConvert.SerializeObject(userToken);
				return Content(json, "application/json");
			}
			catch (Exception e)
			{
				return StatusCode(500, new { message = e.Message });
			}
		}
		#endregion
	}
}
