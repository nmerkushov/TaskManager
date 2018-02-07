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
				.Include(p => p.Tasks)
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
	}
}
