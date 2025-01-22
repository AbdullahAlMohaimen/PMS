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
	public class MenuService : IMenuService
	{
		private readonly IDbContextFactory<DataContext> _contextFactory;
		public MenuService(IDbContextFactory<DataContext> contextFactory)
		{
			_contextFactory = contextFactory;
		}

		#region GET CURRENT USER MENU
		public async Task<List<MenuItem>> GETCURRENTUSERMENU(int userID)
		{
			List<Menu> allMenus = new List<Menu>();
			List<MenuItem> allMenuItems = new List<MenuItem>();
			try
			{
				allMenus = await this.GETALL();
				foreach (var oMenu in allMenus)
				{
					var menuItem = new MenuItem
					{
						ID = oMenu.Id,
						ParentID = oMenu.MenuParentID,
						Key = oMenu.MenuKey,
						Label = oMenu.MenuName,
						Icon = oMenu.MenuIcon,
						Route = oMenu.MenuPath,
						Items = new List<MenuItem>()
					};
					if (oMenu.MenuParentID == 0)
					{
						allMenuItems.Add(menuItem);
					}
					else
					{
						var parentMenu = FindParentMenu(allMenuItems, oMenu.MenuParentID);
						if (parentMenu != null)
						{
							parentMenu.Items.Add(menuItem);
						}
					}
				}
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
			return allMenuItems;
		}

		private MenuItem FindParentMenu(List<MenuItem> menuItems, int parentID)
		{
			foreach (var menuItem in menuItems)
			{
				if (menuItem.ID == parentID)
				{
					return menuItem;
				}
				var parent = FindParentMenu(menuItem.Items, parentID);
				if (parent != null)
				{
					return parent;
				}
			}
			return null;
		}

		#endregion
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
		public async Task MenuApproveOrDisApprove(List<Menu> approvalMenu)
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
