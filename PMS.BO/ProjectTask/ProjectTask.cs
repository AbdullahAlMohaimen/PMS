﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class ProjectTask
	{
		#region Constractor
		public ProjectTask() { }
		#endregion
		public int ProjectTaskId { get; set; }
		public string Title { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string Status { get; set; } = "Pending"; // Pending, In Progress, Completed
		public DateTime Deadline { get; set; }

		// Foreign Keys
		public int ProjectId { get; set; }
		public int? ParentTaskId { get; set; } // For subtasks

		// Navigation Properties
		public Project Project { get; set; } = null!;
		public ProjectTask? ParentTask { get; set; }
		public ICollection<ProjectTask> SubTasks { get; set; } = new List<ProjectTask>();
		public ICollection<User> Assignees { get; set; } = new List<User>();
		public ICollection<Resource> Resources { get; set; } = new List<Resource>();
		public ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
		public ICollection<TimeTracking> TimeTrackings { get; set; } = new List<TimeTracking>();
	}
}