using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace TaskManager.Models
{
	public class Project
	{
		
		public long ProjectID { get; set; }
		public string ProjectName { get; set; }

		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public int? BankID { get; set; }
		public Bank Bank { get; set; }
		public int? ContactPersonID { get; set; }
		public Person ContactPerson { get; set; }
		public string Director { get; set; }
		public string PhoneFaxes { get; set; }
		public ICollection<Task> Tasks { get; set; } = new HashSet<Task>();

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
