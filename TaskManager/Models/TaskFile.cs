using System.Collections.Generic;

namespace TaskManager.Models
{
    public class TaskFile
    {
		public int TaskFileID { get; set; }
		public int TaskID { get; set; }
		public string FileName { get; set; }
	}
	public class TaskFileSend : TaskFile
	{
		public bool IsAdded { get; set; }
		public bool IsDeleted { get; set; }
	}

	public class TaskFilesList
	{
		public List<TaskFileSend> taskFiles { get; set; }
	}
}
