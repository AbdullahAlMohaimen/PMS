using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class TimeTracking
	{
		#region Constractor
		public TimeTracking() { }
		#endregion
		public int TimeTrackingId { get; set; }
		public DateTime StartTime { get; set; }
		public DateTime EndTime { get; set; }
		public string Notes { get; set; } = string.Empty;

		// Calculated Property (Not mapped to DB)
		public TimeSpan Duration => EndTime - StartTime;

		// Foreign Keys
		public int UserId { get; set; }
		public int TaskId { get; set; }

		// Navigation Properties
		public User User { get; set; } = null!;
		public ProjectTask Task { get; set; } = null!;
	}
}
