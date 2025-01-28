using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PMS.BO;

namespace PMS.Controllers
{
    [Route("api/ProjectTask")]
    [ApiController]
    [Authorize]
    public class ProjectTaskController:ControllerBase
    {
        private readonly IProjectTaskService _service;

        public ProjectTaskController(IProjectTaskService service)
        {
            this._service = service;
        }

        // EmployeeShortLeave


        [HttpGet("get/{Id}")]
        public async Task<ActionResult> Get(int Id)
        {
            List<ProjectTask> items = new List<ProjectTask>();
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

        [HttpGet("GetProjectTaskByUser/{userId}")]
        public async Task<ActionResult> GetByUser(int userId)
        {
            List<ProjectTask> items = new List<ProjectTask>();
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

      
        [HttpPost("Save")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Save(ProjectTask projectTasks)
        {
            try
            {
                await _service.Save(projectTasks);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

            return Ok(true);
        }
    }
}
