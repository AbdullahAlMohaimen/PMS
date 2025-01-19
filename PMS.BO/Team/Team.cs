using PMS.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Team: BasicBase
    {
		#region Constractor
		public Team() { }
		#endregion
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;

        // Navigation Properties
        public ICollection<TeamUser> TeamUsers { get; set; } = new List<TeamUser>();
       
		public ICollection<Project> Projects { get; set; } = new List<Project>();
	}
    public interface ITeamService
    {
        public Task<int> Save(Team item);
        public Task<List<Team>> GetTeamByUser(int userId);
        public Task<List<Team>> GetTeam(int Id);
    }
}
