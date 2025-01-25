using PMS.MODEL;
using System;
using System.Collections.Generic;
using System.Data;


namespace PMS.BO
{
    public class Role : BasicBase
    {
        #region Constructor

        public Role()
        {
            Code = string.Empty;
            Name = string.Empty;

        }

        #endregion

        #region Properties
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
    
    
        #endregion
    }

   
    public interface IRoleService
    {
        Role Get(int id);
        List<Role> GetAllRole();
        int Save(Role item);
        void UpdateRoleStatus(Role item);
        void Delete(int id);
     

    }

}
