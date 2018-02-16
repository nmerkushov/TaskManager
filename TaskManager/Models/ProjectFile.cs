using System.Collections.Generic;

namespace TaskManager.Models
{
	public class ProjectFile
	{
		public int ProjectFileID { get; set; }
		public int ProjectID { get; set; }
		public string FileName { get; set; }
	}

	public class ProjectFileSend : ProjectFile
	{
		public bool IsAdded { get; set; }
		public bool IsDeleted { get; set; }
	}

	public class ProjectFilesList
	{
		public List<ProjectFileSend> projectFiles { get; set; }
	}

}
