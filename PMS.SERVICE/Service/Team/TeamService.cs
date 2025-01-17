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
        public List<Team> GetTeamByUser(int userId)
        {
            try
            {
                return _context.Teams.Where(x => x.CreatedBy == userId).ToList();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
        }
        public List<Team> GetTeam(int Id)
        {
            try
            {
                return _context.Teams.Where(x => x.Id == Id).ToList();
            }
            catch (Exception e)
            {
                throw e.InnerException;
            }
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
