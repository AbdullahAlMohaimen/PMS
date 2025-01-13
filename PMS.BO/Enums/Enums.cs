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
    
}


