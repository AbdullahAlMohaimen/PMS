using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PMS.BO;

namespace PMS.Controllers
{
    [Route("api/Project")]
    [ApiController]
    [Authorize]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _service;

        public ProjectController(IProjectService service)
        {
            this._service = service;
        }

        // EmployeeShortLeave


        [HttpGet("get/{Id}")]
        public async Task<ActionResult> Get(int Id)
        {
            List<Project> items = new List<Project>();
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

        [HttpGet("getProject/{userId}")]
        public async Task<ActionResult> GetProjectByUser(int userId)
        {
            List<Project> items = new List<Project>();
            try
            {
                items = await _service.GetProjectByUser(userId);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(items);
        }

        [HttpPost("SaveProject")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SaveProject(Project Projects)
        {
            try
            {
                await _service.Save(Projects);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(true);
        }



    }
}
