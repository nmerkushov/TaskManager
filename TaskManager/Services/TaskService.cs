using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Services
{
	public interface ITaskService
	{
		Task<IEnumerable<ProjectTask>> GetTasks(int projectID);
		Task<int> AddNewTask(ProjectTask task);
		Task<int> EditTask(ProjectTask task);
		Task<int> DeleteTask(ProjectTask task);
		Task<IEnumerable<TaskManager.Models.TaskStatus>> GetTaskStatuses();
		Task<IEnumerable<TaskFile>> GetTaskFiles(int projectID, int taskID);
		Task UpdateTaskFiles(List<IFormFile> filesContent, string taskFilesJson, int projectID, int taskID);
		Task<TaskFile> GetTaskFile(int projectID, int taskID, int taskFileID);
	}

    public class TaskService: ITaskService
    {
		private TaskManagerContext _context;

		public TaskService(TaskManagerContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<ProjectTask>> GetTasks(int projectID)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Tasks).ThenInclude(t => t.ResponsiblePerson)
					.Include(p => p.Tasks).ThenInclude(t => t.Status)
					.FirstOrDefaultAsync();
				return project == null ? new List<ProjectTask>() : project.Tasks;
			}
		}

		public async Task<int> AddNewTask(ProjectTask task)
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

			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == task.ProjectID)
					.Include(p => p.Tasks)
					.FirstOrDefaultAsync();
				if (project != null)
				{
					project.Tasks.Add(task);
					_context.Projects.Update(project);
					return await _context.SaveChangesAsync();
				}
			}
			return 0;
		}

		public async Task<int> EditTask(ProjectTask task)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == task.ProjectID)
					.Include(p => p.Tasks)
					.FirstOrDefaultAsync();

				if (project != null)
				{
					ProjectTask dbTask = project.Tasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault();
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
						return await _context.SaveChangesAsync();
					}
				}
			}
			return 0;
		}

		public async Task<int> DeleteTask(ProjectTask task)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == task.ProjectID)
					.Include(p => p.Tasks)
					.FirstOrDefaultAsync();
				if (project != null)
				{
					project.Tasks.Remove(project.Tasks.Where(t => t.TaskID == task.TaskID).FirstOrDefault());
					_context.Projects.Update(project);
					return await _context.SaveChangesAsync();
				}
			}
			return 0;
		}

		public async Task<IEnumerable<TaskManager.Models.TaskStatus>> GetTaskStatuses()
		{
			using (_context)
			{
				return await _context.TaskStatuses.ToListAsync();
			}
		}

		public async Task<IEnumerable<TaskFile>> GetTaskFiles(int projectID, int taskID)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
					.FirstOrDefaultAsync();
				if (project != null)
				{
					ProjectTask task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
					if (task != null)
					{
						return task.TaskFiles;
					}
				}
				return new List<TaskFile>();
			}
		}

		public async Task UpdateTaskFiles(List<IFormFile> filesContent, string taskFilesJson, int projectID, int taskID)
		{
			using (_context)
			{
				List<TaskFileSend> taskFiles = JsonConvert.DeserializeObject<TaskFilesList>(taskFilesJson).taskFiles;

				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
					.FirstOrDefaultAsync();

				if (project != null)
				{
					ProjectTask task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
					if (task != null)
					{
						for (int i = 0; i < taskFiles.Count(); i++)
						{
							if (taskFiles[i].IsDeleted)
							{
								task.TaskFiles.Remove(task.TaskFiles.Where(tf => tf.TaskFileID == taskFiles[i].TaskFileID).FirstOrDefault());

								_context.Projects.Update(project);
								await _context.SaveChangesAsync();

								DeleteTaskFile(taskFiles[i].TaskFileID);
							}
							else if (taskFiles[i].IsAdded)
							{
								TaskFile tf = new TaskFile();
								tf.TaskID = taskID;
								tf.FileName = taskFiles[i].FileName;
								task.TaskFiles.Add(tf);

								_context.Projects.Update(project);
								await _context.SaveChangesAsync();

								Stream fileStream = filesContent[i].OpenReadStream();
								SaveTaskFile(tf.TaskFileID, fileStream);
							}
						}
					}
				}
			}
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

		public async Task<TaskFile> GetTaskFile(int projectID, int taskID, int taskFileID)
		{
			using (_context)
			{ 
				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Tasks).ThenInclude(t => t.TaskFiles)
					.FirstOrDefaultAsync();
				if (project != null)
				{
					ProjectTask task = project.Tasks.Where(t => t.TaskID == taskID).FirstOrDefault();
					if (task != null)
					{
						return task.TaskFiles.Where(tf => tf.TaskFileID == taskFileID).FirstOrDefault();
					}
				}
			}
			return null;
		}
	}
}
