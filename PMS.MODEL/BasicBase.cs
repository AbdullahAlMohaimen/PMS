using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.MODEL
{
    public class BasicBase
    {
        public int CreatedBy { get; set; }
        public DateTime CreationDate { get; set; }
        public int? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
       // public EnumStatus status { get; set; }
    }
}
