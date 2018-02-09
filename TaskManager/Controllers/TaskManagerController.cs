using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Controllers
{
	public class TaskManagerController : Controller
	{
		private TaskManagerContext _context;

		public TaskManagerController(TaskManagerContext context)
		{
			_context = context;
		}

		public IActionResult ProjectList()
		{
			return View();
		}

		public IActionResult GetProjects()
		{
			var projects = _context.Projects
				.Include(p => p.Bank)
				.Include(p => p.ContactPerson)
				.ToList();

			return new ObjectResult(projects);
		}

		public IActionResult GetBanks()
		{
			var banks = _context.Banks.ToList();

			return new ObjectResult(banks);
		}

		public IActionResult GetPersons()
		{
			var persons = _context.Persons.ToList();

			return new ObjectResult(persons);
		}

		[HttpPost]
		public IActionResult AddNewProject([FromBody]Project project)
		{
			if (project.BankID == 0)
			{
				project.BankID = null;
			}
			if (project.ContactPersonID == 0)
			{
				project.ContactPersonID = null;
			}
			_context.Projects.Add(project);
			_context.SaveChanges();

			return Ok();
		}

		[HttpPost]
		public IActionResult EditProject([FromBody]Project project)
		{
			if (project.BankID == 0)
			{
				project.BankID = null;
			}
			if (project.ContactPersonID == 0)
			{
				project.ContactPersonID = null;
			}
			project.Bank = null;
			project.ContactPerson = null;
			_context.Projects.Update(project);
			_context.SaveChanges();
			return Ok();
		}

		[HttpPost]
		public IActionResult DeleteProject([FromBody]Project project)
		{
			_context.Projects.Remove(project);
			_context.SaveChanges();
			return Ok();
		}

		[Route("taskmanager/gettasks/{projectID}")]
		public IActionResult GetTasks(int projectID)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.Tasks).ThenInclude(t => t.ResponsiblePerson)
				.Include(p => p.Tasks).ThenInclude(t => t.Status)
				.FirstOrDefault();
			return new ObjectResult(project == null ? new HashSet<Task>() : project.Tasks);
		}

		[Route("taskmanager/getprojectbyid/{projectID}")]
		public IActionResult GetProjectByID(int projectID)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.Bank)
				.Include(p => p.ContactPerson)
				.FirstOrDefault();
			return new ObjectResult(project);
		}

		public IActionResult GetTaskStatuses()
		{
			var taskStatuses = _context.TaskStatuses.ToList();

			return new ObjectResult(taskStatuses);
		}

		[HttpPost]
		public IActionResult AddNewTask([FromBody]Task task)
		{
			if (task.StatusID == 0)
			{
				task.StatusID = null;
			}
			if (task.ResponsiblePersonID == 0)
			{
				task.ResponsiblePersonID = null;
			}
			task.Status = null;
			task.ResponsiblePerson = null;

			Project project = _context.Projects.Where(p => p.ProjectID == task.ProjectID)
				.Include(p => p.Tasks)
				.FirstOrDefault();

			if (project != null)
			{
				project.Tasks.Add(task);
				_context.Projects.Update(project);
				_context.SaveChanges();
			}

			return Ok();
		}

		[HttpPost]
		public IActionResult EditTask([FromBody]Task task)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == task.ProjectID)
				.Include(p => p.Tasks)
				.FirstOrDefault();

			if (project != null)
			{
				Task dbTask = project.Tasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault();
				if (dbTask != null)
				{
					dbTask.TaskName = task.TaskName;
					dbTask.Priority = task.Priority;
					if (task.ResponsiblePersonID == 0)
					{
						dbTask.ResponsiblePersonID = null;
					}
					else
					{
						dbTask.ResponsiblePersonID = task.ResponsiblePersonID;
					}
					dbTask.ResponsiblePerson = null;
					dbTask.UpToDate = task.UpToDate;
					if (task.StatusID == 0)
					{
						dbTask.StatusID = null;
					}
					else
					{
						dbTask.StatusID = task.StatusID;
					}
					dbTask.Status = null;
					dbTask.Notes = task.Notes;
					dbTask.ResponseAction = task.ResponseAction;

					_context.Projects.Update(project);
					_context.SaveChanges();
				}
			}

			return Ok();
		}

		[HttpPost]
		public IActionResult DeleteTask([FromBody]Task task)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == task.ProjectID)
				.Include(p => p.Tasks)
				.FirstOrDefault();

			if (project != null)
			{
				project.Tasks.Remove(project.Tasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault()) ;
				_context.Projects.Update(project);
				_context.SaveChanges();
			}
			return Ok();
		}
	}
}
