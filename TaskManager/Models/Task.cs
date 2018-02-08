using System;

namespace TaskManager.Models
{
	public class Task
	{
		public int TaskID { get; set; }
		public int ProjectID { get; set; }
		public string TaskName { get; set; }
		public decimal Priority { get; set; }
		public int? ResponsiblePersonID { get; set; }
		public Person ResponsiblePerson { get; set; }
		public DateTime? UpToDate { get; set; }
		public int? StatusID { get; set; }
		public TaskStatus Status { get; set; }
		public string Notes { get; set; }
		public string ResponseAction { get; set; }
    }
}
