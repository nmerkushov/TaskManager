using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Services
{
	public interface IPersonService
	{
		Task<IEnumerable<Person>> GetPersons();
		Task<int> AddNewPerson(Person person);
		Task<int> EditPerson(Person person);
		Task<int> DeletePerson(Person person);
	}

    public class PersonService: IPersonService
    {
		private TaskManagerContext _context;

		public PersonService(TaskManagerContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Person>> GetPersons()
		{
			using (_context)
			{
				return await _context.Persons.ToListAsync();
			}
		}

		public async Task<int> AddNewPerson(Person person)
		{
			using (_context)
			{
				await _context.Persons.AddAsync(person);
				return await _context.SaveChangesAsync();
			}
		}

		public async Task<int> EditPerson(Person person)
		{
			using (_context)
			{
				_context.Persons.Update(person);
				return await _context.SaveChangesAsync();
			}
		}

		public async Task<int> DeletePerson(Person person)
		{
			using (_context)
			{
				_context.Persons.Remove(person);
				return await _context.SaveChangesAsync();
			}
		}
	}
}
