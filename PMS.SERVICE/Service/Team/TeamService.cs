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
        private readonly DataContext _context;

		public TeamService()
		{
		}
		public TeamService(DataContext context)
        {
            _context = context;
        }
        public List<Team> getTeam(int userId)
        {
           return _context.Teams.Where(x=>x.Id == userId).ToList();
        }

        public int Save(Team item)
        {
            try
            {
                
                _context.Teams.Add(item);
                _context.SaveChangesAsync();
                _context.Update(item);
                return item.Id;
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
       
    }
}
