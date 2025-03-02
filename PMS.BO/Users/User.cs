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
		public User(LoginRequest loginRequest) {
			Name = loginRequest.UserName;
			Email = loginRequest.Email;
			LoginType = loginRequest.AuthorityType;
			//AuthorizedDate = DateTime.Now;
			//AuthorizedDate = DateTime.UtcNow;
			AuthorizedDate = DateTime.Now.ToUniversalTime();

			if (LoginType == EnumLoginType.Normal)
			{
				string userPassword = loginRequest.Password;
				Solt = new AuthPassword().CreateSalt(128);
				Password = new AuthPassword().GenerateHash(userPassword, Solt);
			}
		}
		#endregion

		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public string Password { get; set; } = "";
		public string Solt { get; set; } = "";
		public EnumLoginType LoginType { get; set; } = EnumLoginType.Normal;
       	public string Language { get; set; } = "English";
		public DateTime AuthorizedDate { get; set; }

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
		public Task<int> Save(User item);
		public Task<User> GetByEmail(string email);
		public Task<User> FindUser(LoginRequest item);
	}
}
