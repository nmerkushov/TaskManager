using System.Collections.Generic;

namespace TaskManager.Models
{
	public class Project
	{		
		public int ProjectID { get; set; }
		public string ProjectName { get; set; }
		public int? BankID { get; set; }
		public Bank Bank { get; set; }
		public int? ContactPersonID { get; set; }
		public Person ContactPerson { get; set; }
		public string Director { get; set; }
		public string PhoneFaxes { get; set; }
		public ICollection<Task> Tasks { get; set; } = new List<Task>();
		public ICollection<ProjectFile> ProjectFiles { get; set; } = new List<ProjectFile>();

		public string BankName
		{
			get
			{
				if (Bank != null)
					return Bank.BankName;
				else
					return "";
			}
		}

		public string ContactPersonName
		{
			get
			{
				if (ContactPerson != null)
					return ContactPerson.FIO;
				else
					return "";
			}
		}
	}
}
