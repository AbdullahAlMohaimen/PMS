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
		[HttpPost("GetCurrentUserMenus")]
		[ValidateAntiForgeryToken]
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
		[ValidateAntiForgeryToken]
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
	}
}
