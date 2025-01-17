using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;
using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.SERVICE
{

    public class UsersService : IUserService
    {
        private readonly IDbContextFactory<DataContext> _contextFactory;

        public UsersService(IDbContextFactory<DataContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }

        public async Task<int> Save(User item)
        {
            using var context = _contextFactory.CreateDbContext();
            context.Users.Add(item);
            await context.SaveChangesAsync();
            return item.Id;
        }

        public async Task<User> GetByEmail(string email)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public async Task<User> FindUser(LoginRequest item)
        {
            using var context = _contextFactory.CreateDbContext();
            return await context.Users.FirstOrDefaultAsync(x => x.Email == item.Email);
        }
    }
   
}
