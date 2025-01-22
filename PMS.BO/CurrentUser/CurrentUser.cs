using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;

namespace PMS.BO
{
	public class CurrentUser
	{
		#region Property
		public int ID { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Language { get; set; }
		public EnumLoginType LoginType { get; set; }
		public DateTime AuthorizedDate { get; set; }
		#endregion

		#region GET CURRENT USER
		public static CurrentUser GET_CURRENT_USER(ClaimsPrincipal oClaimPrinciple)
		{
			if (oClaimPrinciple == null || oClaimPrinciple.Identity == null || oClaimPrinciple.Identity.IsAuthenticated == false)
			{
				return null;
			}
			CurrentUser oCurrentUser = new CurrentUser();
			foreach (Claim item in oClaimPrinciple.Claims)
			{
				if (item.Type == "ID")
					oCurrentUser.ID = Convert.ToInt32(item.Value);
				if (item.Type == "Name")
					oCurrentUser.Name = item.Value;
				if (item.Type == "Email")
					oCurrentUser.Email = item.Value;
				if (item.Type == "Language")
					oCurrentUser.Language = item.Value;
				if (item.Type == "LoginType")
					oCurrentUser.LoginType = (EnumLoginType)Convert.ToInt32(item.Value);
				if (item.Type == "AuthorizedDate")
					oCurrentUser.AuthorizedDate = Convert.ToDateTime(item.Value);
			}
			return oCurrentUser;
		}
		#endregion
	}
}
