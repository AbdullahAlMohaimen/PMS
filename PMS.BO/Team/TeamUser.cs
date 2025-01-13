using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class TeamUser
	{
		#region Constractor
		public TeamUser() { }
        #endregion
        public int Id { get; set; }
        public int TeamId { get; set; }
        public int UserId { get; set; }
        public EnumTeamMemberType TeamUserType { get; set; } = EnumTeamMemberType.Colaborator;

        // Navigation Properties
        public User User { get; set; }
        public Team Team { get; set; }
    }

}
