using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Project
	{
		#region Constractor
		public Project() { }
		#endregion
		public int ProjectId { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string Status { get; set; } = "Active"; // Active, Completed, Archived
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }

		// Foreign Key
		public int TeamId { get; set; }

		// Navigation Properties
		public Team Team { get; set; } = null!;
		public ICollection<Task> Tasks { get; set; } = new List<Task>();
		public ICollection<Milestone> Milestones { get; set; } = new List<Milestone>();
		public ICollection<Resource> Resources { get; set; } = new List<Resource>();
	}
}
