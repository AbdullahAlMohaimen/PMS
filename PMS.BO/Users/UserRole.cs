using PMS.MODEL;
using System;
using System.Collections.Generic;
using System.Data;

namespace PMS.BO
{
    #region UserRole

    public class UserRole : BasicBase
    {
        #region Constructor

        public UserRole()
        {
      
        }

        #endregion

        #region Properties
        public int Id { get; set; }
        public int RoleID { get; set; }
        public int UserID { get; set; }

        // Navigation Properties
        public Role Role { get; set; } = new Role();
        public User User { get; set; } = new User();
       
        

        #endregion


    }
    #endregion

    #region IUserRole Service

    public interface IUserRoleService
    {
        UserRole Get(int id);

        List<UserRole> GetByUserID(int UserID);

        DataTable GetUserMenuByRole(string roleId);
    
        void Save(List<UserRole> userRoles, int payrolltypeid);
        void Delete(int id);
    }

    #endregion
}
