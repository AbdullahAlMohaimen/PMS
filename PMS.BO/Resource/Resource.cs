using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class Resource
	{
		#region Constractor
		public Resource() { }
		#endregion
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Type { get; set; } = "File"; // File, Link, Document
		public string Url { get; set; } = string.Empty;

		// Foreign Key
		public int ProjectId { get; set; }

		// Navigation Property
		public Project Projects { get; set; } = null!;
	}
}
