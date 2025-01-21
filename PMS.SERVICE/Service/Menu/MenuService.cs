using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;

namespace PMS.SERVICE
{
	public class MenuService
	{
		private readonly IDbContextFactory<DataContext> _contextFactory;
		public MenuService(IDbContextFactory<DataContext> contextFactory)
		{
			_contextFactory = contextFactory;
		}

		public async Task<int> Save(Menu item)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				context.Menus.Add(item);
				await context.SaveChangesAsync();
				return item.Id;
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public async Task<Menu> GET(int menuID)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				return await context.Menus.FirstOrDefaultAsync(x => x.Id == menuID);
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public async Task<Menu> GET(string menuKey)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				return await context.Menus.FirstOrDefaultAsync(x => x.MenuKey == menuKey);
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public async Task<List<Menu>> GET(EnumMenuStatus status)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				return await context.Menus.Where(x => x.MenuStatus == status).ToListAsync();
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public async Task<List<Menu>> GETALL()
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				return await context.Menus.ToListAsync();
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}

		public async Task UPDATEMENUKEY(Menu oMenu)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				var menu = await context.Menus.FindAsync(oMenu.Id);
				if (menu != null)
				{
					menu.MenuKey = oMenu.MenuKey;
					await context.SaveChangesAsync();
				}
			}
			catch (Exception e)
			{
				throw new Exception("Menu not found.");
			}
		}

		public async Task UPDATEMENUSTATUS(Menu oMenu)
		{
			try
			{
				using var context = _contextFactory.CreateDbContext();
				var menu = await context.Menus.FindAsync(oMenu.Id);
				if (menu != null)
				{
					menu.MenuStatus = oMenu.MenuStatus;
					await context.SaveChangesAsync();
				}
			}
			catch (Exception e)
			{
				throw new Exception("Menu not found.");
			}
		}
		public void MenuApproveOrDisApprove(List<Menu> approvalMenu)
		{
			try
			{

			}
			catch (Exception e)
			{
				throw new Exception($"Menu with Id not found.");
			}
		}


	}
}
