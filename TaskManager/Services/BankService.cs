using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TaskManager.Models;

namespace TaskManager.Services
{
	public interface IBankService
	{
		Task<IEnumerable<Bank>> GetBanks();
		Task<int> AddNewBank(Bank bank);
		Task<int> EditBank(Bank bank);
		Task<int> DeleteBank(Bank bank);
	}

    public class BankService: IBankService
    {
		private TaskManagerContext _context;

		public BankService(TaskManagerContext context)
		{
			_context = context;
		}

		public async Task<IEnumerable<Bank>> GetBanks()
		{
			using (_context)
			{
				return await _context.Banks.ToListAsync();
			}
		}

		public async Task<int> AddNewBank(Bank bank)
		{
			using (_context)
			{
				await _context.Banks.AddAsync(bank);
				return await _context.SaveChangesAsync();
			}
		}
		
		public async Task<int> EditBank(Bank bank)
		{
			using (_context)
			{
				_context.Banks.Update(bank);
				return await _context.SaveChangesAsync();
			}
		}

		public async Task<int> DeleteBank(Bank bank)
		{
			using (_context)
			{
				_context.Banks.Remove(bank);
				return await _context.SaveChangesAsync();
			}
		}
	}
}
