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
	public interface IProjectService
	{
		Task<IEnumerable<Project>> GetProjects();
		Task<int> AddNewProject(Project project);
		Task<int> EditProject(Project project);
		Task<int> DeleteProject(Project project);
		Task<Project> GetProjectByID(int projectID);
		Task<IEnumerable<ProjectFile>> GetProjectFiles(int projectID);
		Task UpdateProjectFiles(List<IFormFile> filesContent, string projectFilesJson, int projectID);
		Task<ProjectFile> GetProjectFile(int projectID, int projectFileID);
	}

    public class ProjectService: IProjectService
	{
		private TaskManagerContext _context;

		public ProjectService(TaskManagerContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Project>> GetProjects()
		{
			using (_context)
			{
				return await _context.Projects
					.Include(p => p.Bank)
					.Include(p => p.ContactPerson)
					.ToListAsync();
			}
		}

		public async Task<int> AddNewProject(Project project)
		{
			if (project.BankID == 0)
			{
				project.BankID = null;
			}
			if (project.ContactPersonID == 0)
			{
				project.ContactPersonID = null;
			}
			using (_context)
			{
				await _context.Projects.AddAsync(project);
				return await _context.SaveChangesAsync();
			}		
		}

		public async Task<int> EditProject(Project project)
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
			using (_context)
			{
				_context.Projects.Update(project);
				return await _context.SaveChangesAsync();
			}
		}
		
		public async Task<int> DeleteProject(Project project)
		{
			using (_context)
			{
				_context.Projects.Remove(project);
				return await _context.SaveChangesAsync();
			}
		}

		public async Task<Project> GetProjectByID(int projectID)
		{
			using (_context)
			{
				return await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.Bank)
					.Include(p => p.ContactPerson)
					.FirstOrDefaultAsync();
			}
		}

		public async Task<IEnumerable<ProjectFile>> GetProjectFiles(int projectID)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.ProjectFiles)
					.FirstOrDefaultAsync();
				return project == null ? new HashSet<ProjectFile>() : project.ProjectFiles;
			}	
		}

		public async Task UpdateProjectFiles(List<IFormFile> filesContent, string projectFilesJson, int projectID)
		{
			using (_context)
			{
				List<ProjectFileSend> projectFiles = JsonConvert.DeserializeObject<ProjectFilesList>(projectFilesJson).projectFiles;

				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.ProjectFiles)
					.FirstOrDefaultAsync();

				if (project != null)
				{
					for (int i = 0; i < projectFiles.Count(); i++)
					{
						if (projectFiles[i].IsDeleted)
						{
							project.ProjectFiles.Remove(project.ProjectFiles.Where(pf => pf.ProjectFileID == projectFiles[i].ProjectFileID).FirstOrDefault());

							_context.Projects.Update(project);
							await _context.SaveChangesAsync();

							DeleteProjectFile(projectFiles[i].ProjectFileID);
						}
						else if (projectFiles[i].IsAdded)
						{
							ProjectFile pf = new ProjectFile();
							pf.ProjectID = projectID;
							pf.FileName = projectFiles[i].FileName;
							project.ProjectFiles.Add(pf);

							_context.Projects.Update(project);
							await _context.SaveChangesAsync();

							Stream fileStream = filesContent[i].OpenReadStream();
							SaveProjectFile(pf.ProjectFileID, fileStream);
						}
					}
				}
			}
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

		public async Task<ProjectFile> GetProjectFile(int projectID, int projectFileID)
		{
			using (_context)
			{
				Project project = await _context.Projects.Where(p => p.ProjectID == projectID)
					.Include(p => p.ProjectFiles)
					.FirstOrDefaultAsync();
				if (project != null)
				{
					return project.ProjectFiles.Where(pf => pf.ProjectFileID == projectFileID).FirstOrDefault();

				}
			}
			return null;
		}
	}
}
