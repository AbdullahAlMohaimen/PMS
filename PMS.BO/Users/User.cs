﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class User
	{
		#region Constractor
		public User(){}
		#endregion

		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public string Role { get; set; } = "Member"; // Admin, Member
		public string Language { get; set; } = "en";

        // Navigation Properties
        public ICollection<TeamUser> TeamUsers { get; set; } = new List<TeamUser>();
       
		public ICollection<ProjectTask> AssignedTasks { get; set; } = new List<ProjectTask>();
		public ICollection<Notification> Notifications { get; set; } = new List<Notification>();
		public ICollection<ActivityLog> ActivityLogs { get; set; } = new List<ActivityLog>();
		public ICollection<TimeTracking> TimeTrackings { get; set; } = new List<TimeTracking>();
		public ICollection<Chat> ChatsSent { get; set; } = new List<Chat>();
		public ICollection<Chat> ChatsReceived { get; set; } = new List<Chat>();
	}

	public interface IUserService
	{
		public int Save(User item);
		public User GetByEmail(string email);
		public User FindUser(LoginRequest item);
	}
}
