using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace PMS.Controllers
{
    public class ProjectController : ControllerBase
    {
        // GET: ProjectController
        public ActionResult Index()
        {
            return Ok();
        }

        // GET: ProjectController/Details/5
        public ActionResult Details(int id)
        {
            return Ok();
        }

        // GET: ProjectController/Create
        public ActionResult Create()
        {
            return Ok();
        }

        // POST: ProjectController/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // GET: ProjectController/Edit/5
        public ActionResult Edit(int id)
        {
            return Ok();
        }

        // POST: ProjectController/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }

        // GET: ProjectController/Delete/5
        public ActionResult Delete(int id)
        {
            return Ok();
        }

        // POST: ProjectController/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return Ok();
            }
        }
    }
}
