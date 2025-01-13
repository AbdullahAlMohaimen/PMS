using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Milestone
	{
		#region Constractor
		public Milestone() { }
		#endregion

		public int Id { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public DateTime Deadline { get; set; }

		// Foreign Key
		public int ProjectId { get; set; }

		// Navigation Property
		public Project Project { get; set; } = null!;
	}
}
