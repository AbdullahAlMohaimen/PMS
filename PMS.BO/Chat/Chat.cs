using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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

		public int Id { get; set; }
		public string Message { get; set; } = string.Empty;
		public DateTime Timestamp { get; set; }

		// Foreign Keys
		
		public int SenderId { get; set; }
        
        public int ReceiverId { get; set; }

        // Navigation Properties
        [ForeignKey("SenderId")]
        public User Sender { get; set; } = null!;
        [ForeignKey("ReceiverId")]
        public User Receiver { get; set; } = null!;
	}
}
