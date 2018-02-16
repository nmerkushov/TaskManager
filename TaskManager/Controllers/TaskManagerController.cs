using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
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

		[Route("taskmanager/getprojectbyid/{projectID}")]
		public IActionResult GetProjectByID(int projectID)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.Bank)
				.Include(p => p.ContactPerson)
				.FirstOrDefault();
			return new ObjectResult(project);
		}

		public IActionResult GetBanks()
		{
			var banks = _context.Banks.ToList();

			return new ObjectResult(banks);
		}

		[HttpPost]
		public IActionResult AddNewBank([FromBody]Bank bank)
		{
			_context.Banks.Add(bank);
			_context.SaveChanges();

			return Ok();
		}

		[HttpPost]
		public IActionResult EditBank([FromBody]Bank bank)
		{
			_context.Banks.Update(bank);
			_context.SaveChanges();
			return Ok();
		}

		[HttpPost]
		public IActionResult DeleteBank([FromBody]Bank bank)
		{
			_context.Banks.Remove(bank);
			_context.SaveChanges();
			return Ok();
		}

		public IActionResult GetPersons()
		{
			var persons = _context.Persons.ToList();

			return new ObjectResult(persons);
		}

		[HttpPost]
		public IActionResult AddNewPerson([FromBody]Person person)
		{
			_context.Persons.Add(person);
			_context.SaveChanges();

			return Ok();
		}

		[HttpPost]
		public IActionResult EditPerson([FromBody]Person person)
		{
			_context.Persons.Update(person);
			_context.SaveChanges();
			return Ok();
		}

		[HttpPost]
		public IActionResult DeletePerson([FromBody]Person person)
		{
			_context.Persons.Remove(person);
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
					dbTask.RowColor = task.RowColor;

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
				project.Tasks.Remove(project.Tasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault());
				_context.Projects.Update(project);
				_context.SaveChanges();
			}
			return Ok();
		}

		public IActionResult GetTaskStatuses()
		{
			var taskStatuses = _context.TaskStatuses.ToList();

			return new ObjectResult(taskStatuses);
		}

		[Route("taskmanager/getprojectfiles/{projectID}")]
		public IActionResult GetProjectFiles(int projectID)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.ProjectFiles)
				.FirstOrDefault();
			return new ObjectResult(project == null ? new HashSet<ProjectFile>() : project.ProjectFiles);
		}

		[HttpPost, Route("taskmanager/updateprojectfiles/{projectID}")]
		public IActionResult UpdateProjectFiles(List<IFormFile> filesContent, string projectFilesJson, int projectID)
		{
			List<ProjectFileSend> projectFiles = JsonConvert.DeserializeObject<ProjectFilesList>(projectFilesJson).projectFiles;

			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.ProjectFiles)
				.FirstOrDefault();

			if (project != null)
			{
				for (int i = 0; i < projectFiles.Count(); i++)
				{
					if (projectFiles[i].IsDeleted)
					{
						project.ProjectFiles.Remove(project.ProjectFiles.Where(pf => pf.ProjectFileID == projectFiles[i].ProjectFileID).FirstOrDefault());

						_context.Projects.Update(project);
						_context.SaveChanges();

						DeleteProjectFile(projectFiles[i].ProjectFileID);
					}
					else if (projectFiles[i].IsAdded)
					{
						ProjectFile pf = new ProjectFile();
						pf.ProjectID = projectID;
						pf.FileName = projectFiles[i].FileName;
						project.ProjectFiles.Add(pf);

						_context.Projects.Update(project);
						_context.SaveChanges();

						Stream fileStream = filesContent[i].OpenReadStream();
						SaveProjectFile(pf.ProjectFileID, fileStream);
					}
				}
			}

			return Ok();
		}

		private void DeleteProjectFile(int projectFileID)
		{
			FileInfo fileInfo = new FileInfo($"./StoredData/{ProjectFileIDToName(projectFileID)}.dat");
			if (fileInfo.Exists)
			{
				fileInfo.Delete();
			}
		}

		private void SaveProjectFile(int projectFileID, Stream fileStream)
		{
			using (StreamWriter streamToWrite = new StreamWriter(System.IO.File.Create($"./StoredData/{ProjectFileIDToName(projectFileID)}.dat")))
			{

				fileStream.CopyTo(streamToWrite.BaseStream);
			}
		}

		private string ProjectFileIDToName(int projectFileID)
		{
			return $"P{projectFileID.ToString().Trim().PadLeft(7, '0')}";
		}

		[Route("taskmanager/downloadprojectfile/{projectID}/{projectFileID}")]
		public IActionResult DownloadProjectFile(int projectID, int projectFileID)
		{
			string path = $"./StoredData/{ProjectFileIDToName(projectFileID)}.dat";
			if (System.IO.File.Exists(path))
			{
				Project project = _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.ProjectFiles)
					.FirstOrDefault();
				if (project != null)
				{
					ProjectFile projectFile = project.ProjectFiles.Where(pf => pf.ProjectFileID == projectFileID).FirstOrDefault();
					if (projectFile != null)
					{
						var memory = new MemoryStream();
						using (var stream = new FileStream(path, FileMode.Open))
						{
							byte[] bytes = new byte[stream.Length];
							stream.Read(bytes, 0, (int)stream.Length);
							memory.Write(bytes, 0, (int)stream.Length);
							var response = File(bytes, "application/octet-stream", projectFile.FileName); // FileStreamResult
							return response;

						}
					}
				}
			}
			return NotFound();
		}

		[Route("taskmanager/gettaskfiles/{projectID}/{taskID}")]
		public IActionResult GetTaskFiles(int projectID, int taskID)
		{
			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
				.FirstOrDefault();
			if (project != null)
			{
				Task task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
				if (task != null)
				{
					return new ObjectResult(task.TaskFiles);
				}
			}
			return new ObjectResult(new HashSet<TaskFile>());
		}

		[HttpPost, Route("taskmanager/updatetaskfiles/{projectID}/{taskID}")]
		public IActionResult UpdateTaskFiles(List<IFormFile> filesContent, string taskFilesJson, int projectID, int taskID)
		{
			List<TaskFileSend> taskFiles = JsonConvert.DeserializeObject<TaskFilesList>(taskFilesJson).taskFiles;

			Project project = _context.Projects.Where(p => p.ProjectID == projectID)
				.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
				.FirstOrDefault();

			if (project != null)
			{
				Task task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
				if (task != null)
				{
					for (int i = 0; i < taskFiles.Count(); i++)
					{
						if (taskFiles[i].IsDeleted)
						{
							task.TaskFiles.Remove(task.TaskFiles.Where(tf => tf.TaskFileID == taskFiles[i].TaskFileID).FirstOrDefault());

							_context.Projects.Update(project);
							_context.SaveChanges();

							DeleteTaskFile(taskFiles[i].TaskFileID);
						}
						else if (taskFiles[i].IsAdded)
						{
							TaskFile tf = new TaskFile();
							tf.TaskID = taskID;
							tf.FileName = taskFiles[i].FileName;
							task.TaskFiles.Add(tf);

							_context.Projects.Update(project);
							_context.SaveChanges();

							Stream fileStream = filesContent[i].OpenReadStream();
							SaveTaskFile(tf.TaskFileID, fileStream);
						}
					}
				}
			}

			return Ok();
		}

		private void DeleteTaskFile(int taskFileID)
		{
			FileInfo fileInfo = new FileInfo($"./StoredData/{TaskFileIDToName(taskFileID)}.dat");
			if (fileInfo.Exists)
			{
				fileInfo.Delete();
			}
		}

		private void SaveTaskFile(int taskFileID, Stream fileStream)
		{
			using (StreamWriter streamToWrite = new StreamWriter(System.IO.File.Create($"./StoredData/{TaskFileIDToName(taskFileID)}.dat")))
			{

				fileStream.CopyTo(streamToWrite.BaseStream);
			}
		}

		private string TaskFileIDToName(int taskFileID)
		{
			return $"T{taskFileID.ToString().Trim().PadLeft(7, '0')}";
		}

		[Route("taskmanager/downloadtaskfile/{projectID}/{taskID}/{taskFileID}")]
		public IActionResult DownloadTaskFile(int projectID, int taskID, int taskFileID)
		{
			string path = $"./StoredData/{TaskFileIDToName(taskFileID)}.dat";
			if (System.IO.File.Exists(path))
			{
				Project project = _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
					.FirstOrDefault();
				if (project != null)
				{
					Task task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
					if (task != null)
					{
						TaskFile taskFile = task.TaskFiles.Where(tf => tf.TaskFileID == taskFileID).FirstOrDefault();
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
				}
			}
			return NotFound();
		}
	}
}
