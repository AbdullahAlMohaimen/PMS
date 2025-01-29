using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using PMS.BO;

namespace PMS.Controllers
{
    [Route("api/Team")]
    [ApiController]
    [Authorize]
    public class TeamController : ControllerBase
    {
        private readonly ITeamService _service;

        public TeamController(ITeamService service)
        {
            this._service = service;
        }

        // EmployeeShortLeave


        [HttpGet("get/{Id}")]
        public async Task<ActionResult> Get(int Id)
        {
            List<Team> items = new List<Team>();
            try
            {
                items = await _service.Get(Id);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(items);
        }

        [HttpGet("GetByUser/{userId}")]
        public async Task<ActionResult> GetByUser(int userId)
        {
            List<Team> items = new List<Team>();
            try
            {
                items = await _service.GetByUser(userId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(items);
        }

        [HttpPost("SaveTeam")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SaveTeam(Team teams)
        {
            try
            {
                await _service.Save(teams);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(true);
        }

       

    }
}
