using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Team
	{
		#region Constractor
		public Team() { }
		#endregion
		public int TeamId { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;

		// Navigation Properties
		public ICollection<User> Users { get; set; } = new List<User>();
		public ICollection<Project> Projects { get; set; } = new List<Project>();
	}
    public interface ITeamService
    {
        
        public int Save(Team item);
   
        List<Team> getTeam(int userId);
    }
}
