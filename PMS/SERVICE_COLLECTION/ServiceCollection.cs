using PMS.BO;
using PMS.SERVICE;

namespace PMS
{
    public static class ServiceCollection
    {
        public static void ALLServiceCollection(this IServiceCollection oServices)
        {
			oServices.AddScoped<ITeamService, TeamService>();
			oServices.AddScoped<IUserService, UsersService>();
			oServices.AddScoped<IMenuService, MenuService>();
		}
    }
}