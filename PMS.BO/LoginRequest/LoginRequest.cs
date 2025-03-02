﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
	public class LoginRequest
	{
		#region Property

		#region Email : String 
		public string Email { get; set; }
		#endregion

		#region UserName : String 
		public string UserName { get; set; }
		#endregion

		#region Password : String 
		public string Password { get; set; }
		#endregion

		#region ConfirmPassword : String 
		public string ConfirmPassword { get; set; }
		#endregion

		#region IsSSO : bool 
		public bool IsForSignIN { get; set; }
		#endregion

		#region IsSSO : bool 
		public bool IsSSO { get; set; }
		#endregion

		#region AuthorityType : EnumLoginType 
		public EnumLoginType AuthorityType { get; set; } = EnumLoginType.Normal;
		#endregion

		#endregion
	}
}
