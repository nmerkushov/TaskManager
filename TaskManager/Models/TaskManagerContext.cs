using Microsoft.EntityFrameworkCore;

namespace TaskManager.Models
{
	public class TaskManagerContext : DbContext
	{
		public TaskManagerContext() : base()
		{
		}

		public TaskManagerContext(DbContextOptions<TaskManagerContext> options)
			: base(options)
		{
		}

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);

			modelBuilder.Entity<Project>().ToTable("Project");
			modelBuilder.Entity<Project>().HasKey(x => x.ProjectID);
			modelBuilder.Entity<Project>().HasMany(x => x.Tasks).WithOne().HasPrincipalKey(x => x.ProjectID);
			modelBuilder.Entity<Project>().HasOne(x => x.Bank).WithMany().HasForeignKey(x => x.BankID);
			modelBuilder.Entity<Project>().HasOne(x => x.ContactPerson).WithMany().HasForeignKey(x => x.ContactPersonID);
			modelBuilder.Entity<Project>().Property(x => x.ProjectID).HasDefaultValueSql("NEXT VALUE FOR dbo.SeqProjectID");

			modelBuilder.Entity<Task>().ToTable("Task");
			modelBuilder.Entity<Task>().HasKey(x => x.TaskID);
			modelBuilder.Entity<Task>().HasOne(x => x.ResponsiblePerson).WithMany().HasPrincipalKey(x => x.PersonID);
			modelBuilder.Entity<Task>().HasOne(x => x.Status).WithMany().HasForeignKey(x => x.StatusID);
			modelBuilder.Entity<Task>().Property(x => x.TaskID).HasDefaultValueSql("NEXT VALUE FOR dbo.SeqTaskID");

			modelBuilder.Entity<Bank>().ToTable("Bank");
			modelBuilder.Entity<Bank>().HasKey(x => x.BankID);
			modelBuilder.Entity<Bank>().Property(x => x.BankID).HasDefaultValueSql("NEXT VALUE FOR dbo.SeqBankID");

			modelBuilder.Entity<Person>().ToTable("Person");
			modelBuilder.Entity<Person>().HasKey(x => x.PersonID);
			modelBuilder.Entity<Person>().Property(x => x.PersonID).HasDefaultValueSql("NEXT VALUE FOR dbo.SeqPersonID");

			modelBuilder.Entity<TaskStatus>().ToTable("TaskStatus");
			modelBuilder.Entity<TaskStatus>().HasKey(x => x.TaskStatusID);
		}

		public DbSet<Project> Projects { get; set; }
		public DbSet<Person> Persons { get; set; }
		public DbSet<Bank> Banks { get; set; }
		public DbSet<TaskStatus> TaskStatuses { get; set; }
	}
}
