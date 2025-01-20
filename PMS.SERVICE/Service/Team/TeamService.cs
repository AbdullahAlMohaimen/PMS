using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


namespace PMS.SERVICE
{
    public class TeamService : ITeamService
    {
        private readonly IDbContextFactory<DataContext> _contextFactory;

        public TeamService(IDbContextFactory<DataContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<Team>> GetTeamByUser(int userId)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.Teams.Where(x => x.CreatedBy == userId).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<List<Team>> Get(int Id)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.Teams.Where(x => x.Id == Id).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<int> Save(Team item)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                context.Teams.Add(item);
                await context.SaveChangesAsync();
                //_contextFactory.Update(item);
                return item.Id;
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
       
    }
}
