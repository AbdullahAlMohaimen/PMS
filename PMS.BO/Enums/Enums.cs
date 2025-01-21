using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.BO
{
    public enum EnumTeamMemberType
    {
        Owner = 1,
        Colaborator = 2,
        Client = 3
    }
    public enum EnumStatus
    {
        Active = 1,
        Inactive = 2
        
    }
    public enum EnumLoginType
    {
        Normal = 1,
        Google = 2,
        Microsoft=3,
        Github=4
    }
	public enum EnumMenuStatus : short
	{
		Regardless = 0,
		Active = 1,
		Inactive = 2,
		Locked = 3,
		Delete = 4,
		NotYetApprove = 5,
	}

}


