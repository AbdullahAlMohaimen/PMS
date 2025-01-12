using System.Text;
using Microsoft.OpenApi.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.SpaServices.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PMS.SERVICE;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using PMS;


var builder = WebApplication.CreateBuilder(args);

#region Get Information from appsetting.jeson
var otherConfiguration = new ConfigurationBuilder()
						.SetBasePath(Directory.GetCurrentDirectory())
						.AddJsonFile("appsettings.json")
						.Build();
var configuration = new ConfigurationBuilder()
					.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
					.Build();
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
builder.Services.AddSingleton(configuration);
#endregion

#region Get JWT
var jwtConfig = configuration.GetSection("Jwt");
#endregion

#region Session
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(
	options => {
		options.IdleTimeout = TimeSpan.FromMinutes(60);
		options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
		options.Cookie.HttpOnly = true;
	}
);
#endregion

#region set JWT
builder.Services.AddAuthentication(options =>
{
	options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
	options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
	options.RequireHttpsMetadata = false;
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters
	{
		ValidateIssuer = true,
		ValidateAudience = true,
		ValidateLifetime = true,
		ValidateIssuerSigningKey = true,
		ValidIssuer = jwtConfig["Issuer"],
		ValidAudience = jwtConfig["Audience"],
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig["Key"])),
		ClockSkew = TimeSpan.Zero
	};
});
#endregion

builder.Services.AddCors(options =>
{
	options.AddPolicy("AllowAllOrigins",
		builder =>
		{
			builder.AllowAnyOrigin()
				   .AllowAnyMethod()
				   .AllowAnyHeader();
		});
});

builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddControllersWithViews();

builder.Services.AddSpaStaticFiles(configuration =>
{
	configuration.RootPath = "ClientApp/dist";
});

builder.Services.AddDbContext<DataContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

#region SERVICE REGISTRATION
builder.Services.ALLServiceCollection();
#endregion
var app = builder.Build();
app.UseHttpsRedirection();
app.UseStaticFiles();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
	app.UseSwagger();
	app.UseSwaggerUI();
	//app.UseSwaggerUI(options => options.SwaggerEndpoint("/openapi/v1.json","PMS Api"));
}

if (!app.Environment.IsDevelopment())
{
	app.UseSpaStaticFiles();
}

app.UseCors("AllowAllOrigins");
app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.UseSession();
app.UseSpa(spa =>
{
	spa.Options.SourcePath = "ClientApp";
});
app.Run();
