using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Notification
	{
		#region Constractor
		public Notification() { }
		#endregion

		public int Id { get; set; }
		public string Message { get; set; } = string.Empty;
		public string Type { get; set; } = "Info"; // Info, Alert, Warning
		public string Status { get; set; } = "Unread"; // Unread, Read
		public DateTime CreatedAt { get; set; }

		// Foreign Key
		public int UserId { get; set; }

		// Navigation Property
		public User User { get; set; } = null!;
	}
}
