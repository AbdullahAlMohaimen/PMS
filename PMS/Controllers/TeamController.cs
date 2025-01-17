using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PMS.BO;

namespace PMS.Controllers
{
    [Route("api/Team")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _service;

        public TeamController(ITeamService service)
        {
            this._service = service;
        }

        // EmployeeShortLeave


        [HttpGet("getTeam/{userId}")]
        public ActionResult getTeam(int userId)
        {
            List<Team> items = new List<Team>();
            try
            {
                items = _service.GetTeam(userId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(items);
        }

       

        [HttpPost("SaveTeam")]
        public ActionResult SaveTeam(Team teams)
        {
            try
            {
                _service.Save(teams);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(true);
        }

       

    }
}
