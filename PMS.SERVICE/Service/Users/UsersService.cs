using Microsoft.ApplicationInsights.Extensibility.Implementation;
using Microsoft.EntityFrameworkCore;
using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.SERVICE
{
	public class UsersService : IUserService
	{
		private readonly DataContext _context;
		public UsersService(DataContext context)
		{
			_context = context;
		}
		public int Save(User item)
		{
			try
			{
				_context.Users.Add(item);
				_context.SaveChangesAsync();
				return item.Id;
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public User GetByEmail(string email)
		{
			User oUser = null;
			try
			{
				oUser = _context.Users.FirstOrDefault(x => x.Email == email);
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
			return oUser;
		}

		public User FindUser(LoginRequest item)
		{
			User oUser = null;
			try
			{
				oUser = _context.Users.FirstOrDefault(x => x.Email == item.Email);
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
			return oUser;
		}
	}
}
