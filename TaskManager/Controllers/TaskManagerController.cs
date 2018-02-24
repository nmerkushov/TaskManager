using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;
using TaskManager.Services;

namespace TaskManager.Controllers
{
	public class TaskManagerController : Controller
	{
		private readonly IProjectService _projectService;
		private readonly IBankService _bankService;
		private readonly IPersonService _personService;
		private readonly ITaskService _taskService;

		public TaskManagerController(IProjectService projectService, IBankService bankService, IPersonService personService, ITaskService taskService)
		{
			_projectService = projectService;
			_bankService = bankService;
			_personService = personService;
			_taskService = taskService;
		}

		public IActionResult ProjectList()
		{
			return View();
		}

		[Route("taskmanager/projects")]
		public async Task<IActionResult> GetProjects()
		{
			return new ObjectResult(await _projectService.GetProjects());
		}

		[HttpPost]
		public async Task<IActionResult> AddNewProject([FromBody]Project project)
		{
			return new OkObjectResult(await _projectService.AddNewProject(project));
		}

		[HttpPost]
		public async Task<IActionResult> EditProject([FromBody]Project project)
		{
			return new OkObjectResult(await _projectService.EditProject(project));
		}

		[HttpPost]
		public async Task<IActionResult> DeleteProject([FromBody]Project project)
		{
			return new OkObjectResult(await _projectService.DeleteProject(project));
		}

		[Route("taskmanager/project/{projectID}")]
		public async Task<IActionResult> GetProjectByID(int projectID)
		{			
			return new ObjectResult(await _projectService.GetProjects());
		}

		[Route("taskmanager/banks")]
		public async Task<IActionResult> GetBanks()
		{
			return new ObjectResult(await _bankService.GetBanks());
		}

		[HttpPost]
		public async Task<IActionResult> AddNewBank([FromBody]Bank bank)
		{
			return new OkObjectResult(await _bankService.AddNewBank(bank));
		}

		[HttpPost]
		public async Task<IActionResult> EditBank([FromBody]Bank bank)
		{
			return new OkObjectResult(await _bankService.EditBank(bank));
		}

		[HttpPost]
		public async Task<IActionResult> DeleteBank([FromBody]Bank bank)
		{
			return new OkObjectResult(await _bankService.DeleteBank(bank));
		}

		[Route("taskmanager/persons")]
		public async Task<IActionResult> GetPersons()
		{
			return new ObjectResult(await _personService.GetPersons());
		}

		[HttpPost]
		public async Task<IActionResult> AddNewPerson([FromBody]Person person)
		{
			return new OkObjectResult(await _personService.AddNewPerson(person));
		}

		[HttpPost]
		public async Task<IActionResult> EditPerson([FromBody]Person person)
		{
			return new OkObjectResult(await _personService.EditPerson(person));
		}

		[HttpPost]
		public async Task<IActionResult> DeletePerson([FromBody]Person person)
		{
			return new OkObjectResult(await _personService.DeletePerson(person));
		}

		[Route("taskmanager/project/{projectID}/tasks")]
		public async Task<IActionResult> GetTasks(int projectID)
		{
			return new ObjectResult(await _taskService.GetTasks(projectID));
		}

		[HttpPost]
		public async Task<IActionResult> AddNewTask([FromBody]ProjectTask task)
		{
			return new OkObjectResult(await _taskService.DeleteTask(task));
		}

		[HttpPost]
		public async Task<IActionResult> EditTask([FromBody]ProjectTask task)
		{
			return new OkObjectResult(await _taskService.EditTask(task));
		}

		[HttpPost]
		public async Task<IActionResult> DeleteTask([FromBody]ProjectTask task)
		{
			return new OkObjectResult(await _taskService.DeleteTask(task));
		}

		[Route("taskmanager/taskstatuses")]
		public async Task<IActionResult> GetTaskStatuses()
		{
			return new ObjectResult(await _taskService.GetTaskStatuses());
		}

		[Route("taskmanager/project/{projectID}/projectfiles")]
		public async Task<IActionResult> GetProjectFiles(int projectID)
		{
			return new ObjectResult(await _projectService.GetProjectFiles(projectID));
		}

		[HttpPost, Route("taskmanager/project/{projectID}/updateprojectfiles")]
		public async Task<IActionResult> UpdateProjectFiles(List<IFormFile> filesContent, string projectFilesJson, int projectID)
		{
			await _projectService.UpdateProjectFiles(filesContent, projectFilesJson, projectID);
			return Ok();
		}

		private string ProjectFileIDToName(int projectFileID)
		{
			return $"P{projectFileID.ToString().Trim().PadLeft(7, '0')}";
		}

		[Route("taskmanager/project/{projectID}/downloadprojectfile/{projectFileID}")]
		public async Task<IActionResult> DownloadProjectFile(int projectID, int projectFileID)
		{
			string path = $"./StoredData/{ProjectFileIDToName(projectFileID)}.dat";
			if (System.IO.File.Exists(path))
			{
				ProjectFile projectFile = await _projectService.GetProjectFile(projectID, projectFileID);
				if (projectFile != null)
				{
					var memory = new MemoryStream();
					using (var stream = new FileStream(path, FileMode.Open))
					{
						byte[] bytes = new byte[stream.Length];
						stream.Read(bytes, 0, (int)stream.Length);
						memory.Write(bytes, 0, (int)stream.Length);
						var response = File(bytes, "application/octet-stream", projectFile.FileName);
						return response;
					}
				}
			}
			return NotFound();
		}

		[Route("taskmanager/project/{projectID}/task/{taskID}/taskfiles")]
		public async Task<IActionResult> GetTaskFiles(int projectID, int taskID)
		{
			return new ObjectResult(await _taskService.GetTaskFiles(projectID, taskID));
		}

		[HttpPost, Route("taskmanager/project/{projectID}/task/{taskID}/updatetaskfiles")]
		public async Task<IActionResult> UpdateTaskFiles(List<IFormFile> filesContent, string taskFilesJson, int projectID, int taskID)
		{
			await _taskService.UpdateTaskFiles(filesContent, taskFilesJson, projectID, taskID);
			return Ok();
		}

		private string TaskFileIDToName(int taskFileID)
		{
			return $"T{taskFileID.ToString().Trim().PadLeft(7, '0')}";
		}

		[Route("taskmanager/project/{projectID}/task/{taskID}/downloadtaskfile/{taskFileID}")]
		public async Task<IActionResult> DownloadTaskFile(int projectID, int taskID, int taskFileID)
		{
			string path = $"./StoredData/{TaskFileIDToName(taskFileID)}.dat";
			if (System.IO.File.Exists(path))
			{
				TaskFile taskFile = await _taskService.GetTaskFile(projectID, taskID, taskFileID);
				if (taskFile != null)
				{
					var memory = new MemoryStream();
					using (var stream = new FileStream(path, FileMode.Open))
					{
						byte[] bytes = new byte[stream.Length];
						stream.Read(bytes, 0, (int)stream.Length);
						memory.Write(bytes, 0, (int)stream.Length);
						var response = File(bytes, "application/octet-stream", taskFile.FileName); // FileStreamResult
						return response;
					}
				}
			}
			return NotFound();
		}
	}
}
