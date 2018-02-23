using System;
using System.Collections.Generic;

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
		public string ResponsiblePersonName
		{
			get
			{
				if (ResponsiblePerson != null)
					return ResponsiblePerson.FIO;
				else
					return "";
			}
		}
		public string ResponsiblePersonPhoneFaxes
		{
			get
			{
				if (ResponsiblePerson != null)
					return ResponsiblePerson.PhoneFaxes;
				else
					return "";
			}
		}
		public string ResponsiblePersonEmails
		{
			get
			{
				if (ResponsiblePerson != null)
					return ResponsiblePerson.Emails;
				else
					return "";
			}
		}
		public DateTime? UpToDate { get; set; }
		public int? StatusID { get; set; }
		public TaskStatus Status { get; set; }
		public string StatusName
		{
			get
			{
				if (Status != null)
					return Status.TaskStatusName;
				else
					return "";
			}
		}
		public string Notes { get; set; }
		public string ResponseAction { get; set; }
		public string RowColor { get; set; }
		public ICollection<TaskFile> TaskFiles { get; set; } = new List<TaskFile>();
	}
}
