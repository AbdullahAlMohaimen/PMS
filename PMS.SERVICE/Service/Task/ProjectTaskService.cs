using Microsoft.EntityFrameworkCore;
using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.SERVICE
{
    internal class ProjectTaskService
    {
        private readonly IDbContextFactory<DataContext> _contextFactory;

        public ProjectTaskService(IDbContextFactory<DataContext> contextFactory)
        {
            _contextFactory = contextFactory;
        }
        public async Task<List<ProjectTask>> GetByUser(int userId)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.ProjectTasks.Where(x => x.CreatedBy == userId).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }

        public async Task<List<ProjectTask>> Get(int Id)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                return await context.ProjectTasks.Where(x => x.Id == Id).ToListAsync();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public async Task<int> Save(ProjectTask item)
        {
            try
            {
                using var context = _contextFactory.CreateDbContext();
                context.ProjectTasks.Add(item);
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

