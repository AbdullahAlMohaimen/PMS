using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class ActivityLog
	{
		#region Constractor
		public ActivityLog() { }
		#endregion
		public int Id { get; set; }
		public string Action { get; set; } = string.Empty; // Example: "Task Updated", "Status Changed"
		public string Description { get; set; } = string.Empty;
		public DateTime Timestamp { get; set; }

		// Foreign Keys
		public int UserId { get; set; }
		public int TaskId { get; set; }

		// Navigation Properties
		public User User { get; set; } = null!;
		public ProjectTask Task { get; set; } = null!;
	}
}
