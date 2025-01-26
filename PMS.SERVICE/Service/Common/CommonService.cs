using Microsoft.EntityFrameworkCore;
using PMS.BO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Data;
using System.Net.Mail;
using System.Data.SqlClient;
using System.Reflection;

namespace PMS.SERVICE
{
	public class CommonService
	{
		private readonly IDbContextFactory<DataContext> _contextFactory;
		public CommonService(IDbContextFactory<DataContext> contextFactory)
		{
			_contextFactory = contextFactory;
		}

		#region GET CREATED OR MODIFIEDUSER
		#region GET MENU BY ID
		public async Task GETCREATED_OR_MODIFIEDUSER<T>(T entityOrEntities) where T : class
		{
			try
			{
				if (entityOrEntities == null) return;
				if (entityOrEntities is IEnumerable<object> allEntities) //check 'entityOrEntities' is 'ListOfObject' or not
				{
					foreach (var oEntity in allEntities)
					{
						await SET_CREATED_AND_MODIFIED_USERS(oEntity);
					}
				}
				else if (entityOrEntities != null) //if 'entityOrEntities' is 'SingleObject'
				{
					await SET_CREATED_AND_MODIFIED_USERS(entityOrEntities);
				}
			}
			catch (Exception e)
			{
				throw e.InnerException;
			}
		}
		private async Task SET_CREATED_AND_MODIFIED_USERS(object oEntity)
		{
			var commonProperties = new Dictionary<string, string>
			{
				{ "CreatedBy", "CreatedUser" },
				{ "ModifiedBy", "ModifiedUser" }
			};
			foreach (var oProperty in commonProperties)
			{
				var sourceProperty = oEntity.GetType().GetProperty(oProperty.Key, BindingFlags.Public | BindingFlags.Instance);
				var targetProperty = oEntity.GetType().GetProperty(oProperty.Value, BindingFlags.Public | BindingFlags.Instance);
				if (sourceProperty != null && targetProperty != null)
				{
					var sourcePropertyValue = sourceProperty.GetValue(oEntity);
					if (sourcePropertyValue != null && long.TryParse(sourcePropertyValue.ToString(), out var ID))
					{
						var targetPropertyValue = "";
						if (ID != 0 && ID != null)
						{
							using var context = _contextFactory.CreateDbContext();
							User oUser = await context.Users.FirstOrDefaultAsync(x => x.Id == Convert.ToInt32(ID));

							if (oUser != null)
							{
								targetPropertyValue = oUser.Name;
							}
						}
						targetProperty.SetValue(oEntity, targetPropertyValue);
					}
					else
					{
						targetProperty.SetValue(oEntity, null);
					}
				}
			}
		}
		#endregion

		#endregion
	}
}
