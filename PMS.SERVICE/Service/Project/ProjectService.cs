using Microsoft.EntityFrameworkCore;
using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.SERVICE
{
	internal class ProjectService
	{
        private readonly IDbContextFactory<DataContext> _contextFactory;

        public ProjectService(IDbContextFactory<DataContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<Project>> GetByUser(int userId)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.Projects.Where(x => x.CreatedBy == userId).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<List<Project>> GetByTeam(int teamId)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.Projects.Where(x => x.TeamId == teamId).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<List<Project>> Get(int Id)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.Projects.Where(x => x.Id == Id).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<int> Save(Project item)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                context.Projects.Add(item);
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
