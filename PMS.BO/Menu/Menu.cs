using PMS.MODEL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	#region
	public class Menu : BasicBase
	{
		#region constructor
		public Menu() { }
		#endregion

		public int Id { get; set; }
		public string MenuName { get; set; }
		public string MenuIcon { get; set; }
		public string MenuPath { get; set; }
		public string MenuKey { get; set; }
		public int MenuParentID { get; set; }
		public EnumMenuStatus MenuStatus { get; set; }
		public int ApproveDisApproveBy { get; set; }

		#region Generate Next MenuKey
		public static string Generate_MenuKey(List<Menu> existingMenus, bool isParent, int parentID = 0)
		{
			string menuKey = "";
			if (isParent)
			{
				menuKey = Menu.GenerateNextMenuKey(existingMenus, true, parentID);
			}
			else
			{
				menuKey = Menu.GenerateNextMenuKey(existingMenus, false, parentID);
			}
			return menuKey;
		}

		private static string GenerateNextMenuKey(List<Menu> existingMenus, bool isParent, int parentId = 0)
		{
			if (isParent && parentId == 0)
			{
				// Generate key for a new top-level parent menu
				int nextParentId = existingMenus
					.Where(m => m.MenuParentID == 0)
					.Select(m => int.Parse(m.MenuKey.Split('.')[0]))
					.DefaultIfEmpty(0)
					.Max() + 1;
				return $"{nextParentId}.1";
			}
			else
			{
				var parentMenu = existingMenus.FirstOrDefault(m => m.Id == parentId);
				if (parentMenu != null)
				{
					string parentKey = parentMenu.MenuKey;
					int nextChildId = existingMenus
						.Where(m => m.MenuParentID == parentId)
						.Select(m => int.Parse(m.MenuKey.Split('.').Last()))
						.DefaultIfEmpty(0)
						.Max() + 1;

					return $"{parentKey}.{nextChildId}";
				}
				else
				{
					throw new ArgumentException("Parent ID not found");
				}
			}
		}
		#endregion
	}
	#endregion

	#region Menu Item
	public class MenuItem
	{
		public int ID { get; set; }
		public int ParentID { get; set; }
		public string Key { get; set; }
		public string Label { get; set; }
		public string Icon { get; set; }
		public string Route { get; set; }
		public List<MenuItem> Items { get; set; }
	}
	#endregion

	#region IMenuStatus Service
	public interface IMenuService
	{
		public Task<int> Save(Menu item);
		public Task<Menu> GET(int ID);
		public Task<Menu> GET(string menuKey);
		public Task<List<Menu>> GET(EnumMenuStatus status);
		public Task<List<Menu>> GETALL();
		public Task<List<MenuItem>> GETCURRENTUSERMENU(int userID);
		public Task UPDATEMENUKEY(Menu oMenu);
		public Task UPDATEMENUSTATUS(Menu oMenu);
		public Task MenuApproveOrDisApprove(List<Menu> approvalMenu);
	}
	#endregion
}
