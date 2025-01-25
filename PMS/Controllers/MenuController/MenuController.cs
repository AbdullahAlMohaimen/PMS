using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PMS.BO;
using PMS.SERVICE;

namespace PMS.Controllers
{
	[Route("api/Menu")]
	[ApiController]
	[Authorize]
	public class MenuController : ControllerBase
	{
		#region VARIABLE && SERVICE DECLEARE
		private readonly IMenuService _service;
		public MenuController(IMenuService service)
		{
			this._service = service;
		}
		#endregion

		#region GET CURRENT USER ALL MENU
		[HttpGet("GetCurrentUserMenus")]
		public async Task<ActionResult> GetCurrentUserMenus()
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			List<MenuItem> allMenus = new List<MenuItem>();
			try
			{
				allMenus = await _service.GETCURRENTUSERMENU(oCurrentUser.ID);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}

			return Ok(allMenus);
		}
		#endregion

		#region SAVE MENU
		[HttpPost("SaveMenu")]
		public async Task<ActionResult> SaveMenu(dynamic data)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			var item = Newtonsoft.Json.JsonConvert.DeserializeObject(Convert.ToString(data));
			Menu oMenu = (Menu)item["oMenu"].ToObject<Menu>();

			try
			{
				if (oMenu.Id == 0)
				{
					oMenu.CreatedBy = oCurrentUser.ID;
					oMenu.CreationDate = DateTime.Now;
					oMenu.MenuStatus = EnumMenuStatus.NotYetApprove;
				}
				else
				{
					oMenu.ModifiedBy = oCurrentUser.ID;
					oMenu.ModifiedDate = DateTime.Now;
					oMenu.MenuStatus = EnumMenuStatus.Active;
				}
				await _service.Save(oMenu);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}

			return Ok(true);
		}
		#endregion

		#region DELETE MENU
		[HttpGet("DeleteMenu/{ID}")]
		public async Task<ActionResult> DELETEMENU(int ID)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			Menu oMenu = new Menu();
			try
			{
				await _service.DELETE(ID);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion

		#region GET MENU BY ID
		[HttpGet("Get/{Id}")]
		public async Task<ActionResult> Get(int Id)
		{
			Menu oMenu = new Menu();
			try
			{
				oMenu = await _service.GET(Id);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}

			return Ok(oMenu);
		}
		#endregion

		#region GET MENU BY KEY
		[HttpGet("GetMenuByKey/{Key}")]
		public async Task<ActionResult> GETMENYBYKEY(string Key)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			Menu oMenu = new Menu();
			try
			{
				oMenu = await _service.GET(Key);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion

		#region GET ALL MENU
		[HttpGet("GetAllMenu")]
		public async Task<ActionResult> GETALLMENU()
		{
			List<Menu> allMenus = new List<Menu>();
			try
			{
				allMenus = await _service.GETALL();
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok(allMenus);
		}

		[HttpGet("GetAllMenuByStatus/{status}")]
		public async Task<ActionResult> GetAllMenuByStatus(EnumMenuStatus status)
		{
			List<Menu> allMenus = new List<Menu>();
			try
			{
				allMenus = await _service.GET(status);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok(allMenus);
		}
		#endregion

		#region GET ALL MENU BY STATUS
		[HttpGet("GetAllMenuByStatus")]
		public async Task<ActionResult> GETALLMENUBYSTATUS(EnumMenuStatus status)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			List<Menu> allMenus = new List<Menu>();
			try
			{
				allMenus = await _service.GET(status);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion

		#region UPDATE MENU KEY
		[HttpPost("UpdateMenuKey")]
		public async Task<ActionResult> UPDATEMENUKEY(Menu oMenu)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			try
			{
				if (oMenu.Id == 0)
				{
					oMenu.ModifiedBy = oCurrentUser.ID;
					oMenu.ModifiedDate = DateTime.Now;
				}
				_service.UPDATEMENUKEY(oMenu);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion

		#region UPDATE MENU STATUS
		[HttpPost("UpdateMenuKey")]
		public async Task<ActionResult> UPDATEMENUSTATUS(Menu oMenu)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			try
			{
				if (oMenu.Id == 0)
				{
					oMenu.ModifiedBy = oCurrentUser.ID;
					oMenu.ModifiedDate = DateTime.Now;
				}
				_service.UPDATEMENUSTATUS(oMenu);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion

		#region GET MENU KEY
		[HttpGet("GetMenuKey/{isParent}/{parentID}")]
		public async Task<ActionResult> GETMENUKEY(bool isParent, int parentID)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			List<Menu> allMenu = new List<Menu>();
			string menyKey = null;
			try
			{
				allMenu = await _service.GETALL();
				menyKey = Menu.Generate_MenuKey(allMenu, isParent, parentID);
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok(new { menuKey = menyKey });
		}
		#endregion

		#region Menu Approve Or DisApprove
		[HttpPost("MenuApproveOrDisApprove")]
		public async Task<ActionResult> MenuApproveOrDisApprove(List<Menu> approvalMenus)
		{
			CurrentUser oCurrentUser = CurrentUser.GET_CURRENT_USER(HttpContext.User);
			try
			{
				if (approvalMenus.Count > 0)
				{
					foreach (Menu oMenu in approvalMenus)
					{
						oMenu.ModifiedBy = oCurrentUser.ID;
						oMenu.ModifiedDate = DateTime.Now;
						oMenu.ApproveDisApproveBy = oCurrentUser.ID;
					}
					await _service.MenuApproveOrDisApprove(approvalMenus);
				}
			}
			catch (Exception e)
			{
				return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
			}
			return Ok();
		}
		#endregion
	}
}
