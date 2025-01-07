using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Chat
	{
		#region Constractor
		public Chat() { }
		#endregion

		public int ChatId { get; set; }
		public string Message { get; set; } = string.Empty;
		public DateTime Timestamp { get; set; }

		// Foreign Keys
		public int SenderId { get; set; }
		public int ReceiverId { get; set; }

		// Navigation Properties
		public Users Sender { get; set; } = null!;
		public Users Receiver { get; set; } = null!;
	}
}
