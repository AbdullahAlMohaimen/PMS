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
		public int ActivityLogId { get; set; }
		public string Action { get; set; } = string.Empty; // Example: "Task Updated", "Status Changed"
		public string Description { get; set; } = string.Empty;
		public DateTime Timestamp { get; set; }

		// Foreign Keys
		public int UserId { get; set; }
		public int TaskId { get; set; }

		// Navigation Properties
		public Users User { get; set; } = null!;
		public Task Task { get; set; } = null!;
	}
}
