import { Transaction } from '../types';

export const mockTransactions: Transaction[] = [
  { id: '1',  date: '2025-04-01', description: 'April Salary',          amount: 85000, category: 'Salary',        type: 'income'  },
  { id: '2',  date: '2025-04-02', description: 'Rent Payment',           amount: 22000, category: 'Housing',       type: 'expense' },
  { id: '3',  date: '2025-04-03', description: 'Big Basket Groceries',   amount: 3200,  category: 'Food',          type: 'expense' },
  { id: '4',  date: '2025-04-04', description: 'Ola Cab Rides',          amount: 1400,  category: 'Transport',     type: 'expense' },
  { id: '5',  date: '2025-04-05', description: 'Netflix Subscription',   amount: 649,   category: 'Entertainment', type: 'expense' },
  { id: '6',  date: '2025-04-06', description: 'Freelance Project',      amount: 18000, category: 'Freelance',     type: 'income'  },
  { id: '7',  date: '2025-04-08', description: 'Apollo Pharmacy',        amount: 890,   category: 'Healthcare',    type: 'expense' },
  { id: '8',  date: '2025-04-09', description: 'Myntra Shopping',        amount: 4500,  category: 'Shopping',      type: 'expense' },
  { id: '9',  date: '2025-04-10', description: 'Electricity Bill',       amount: 2100,  category: 'Utilities',     type: 'expense' },
  { id: '10', date: '2025-04-11', description: 'Zerodha SIP',            amount: 10000, category: 'Investment',    type: 'expense' },
  { id: '11', date: '2025-04-12', description: 'Swiggy Orders',          amount: 2800,  category: 'Food',          type: 'expense' },
  { id: '12', date: '2025-04-14', description: 'Petrol',                 amount: 1800,  category: 'Transport',     type: 'expense' },
  { id: '13', date: '2025-04-15', description: 'Mid-month Bonus',        amount: 12000, category: 'Salary',        type: 'income'  },
  { id: '14', date: '2025-04-16', description: 'Zomato Dining Out',      amount: 1600,  category: 'Food',          type: 'expense' },
  { id: '15', date: '2025-04-18', description: 'BSNL Internet',          amount: 999,   category: 'Utilities',     type: 'expense' },
  { id: '16', date: '2025-04-19', description: 'Amazon Order',           amount: 3200,  category: 'Shopping',      type: 'expense' },
  { id: '17', date: '2025-04-20', description: 'Weekend Trip – Jaipur',  amount: 5500,  category: 'Entertainment', type: 'expense' },
  { id: '18', date: '2025-04-22', description: 'Gym Membership',         amount: 2000,  category: 'Healthcare',    type: 'expense' },
  { id: '19', date: '2025-04-24', description: 'Freelance Invoice',      amount: 22000, category: 'Freelance',     type: 'income'  },
  { id: '20', date: '2025-04-26', description: 'Ajio Shopping',          amount: 2700,  category: 'Shopping',      type: 'expense' },

  // March
  { id: '21', date: '2025-03-01', description: 'March Salary',           amount: 85000, category: 'Salary',        type: 'income'  },
  { id: '22', date: '2025-03-02', description: 'Rent Payment',           amount: 22000, category: 'Housing',       type: 'expense' },
  { id: '23', date: '2025-03-04', description: 'Groceries',              amount: 2900,  category: 'Food',          type: 'expense' },
  { id: '24', date: '2025-03-06', description: 'Uber Rides',             amount: 1200,  category: 'Transport',     type: 'expense' },
  { id: '25', date: '2025-03-07', description: 'Freelance Project',      amount: 14000, category: 'Freelance',     type: 'income'  },
  { id: '26', date: '2025-03-10', description: 'Hotstar Subscription',   amount: 499,   category: 'Entertainment', type: 'expense' },
  { id: '27', date: '2025-03-12', description: 'Doctor Visit',           amount: 700,   category: 'Healthcare',    type: 'expense' },
  { id: '28', date: '2025-03-14', description: 'Swiggy Orders',          amount: 2400,  category: 'Food',          type: 'expense' },
  { id: '29', date: '2025-03-16', description: 'Electricity Bill',       amount: 1900,  category: 'Utilities',     type: 'expense' },
  { id: '30', date: '2025-03-20', description: 'Zerodha SIP',            amount: 10000, category: 'Investment',    type: 'expense' },
  { id: '31', date: '2025-03-22', description: 'Shopping – Flipkart',    amount: 3800,  category: 'Shopping',      type: 'expense' },
  { id: '32', date: '2025-03-25', description: 'Freelance Invoice',      amount: 8000,  category: 'Freelance',     type: 'income'  },

  // February
  { id: '33', date: '2025-02-01', description: 'February Salary',        amount: 85000, category: 'Salary',        type: 'income'  },
  { id: '34', date: '2025-02-02', description: 'Rent Payment',           amount: 22000, category: 'Housing',       type: 'expense' },
  { id: '35', date: '2025-02-05', description: 'Groceries',              amount: 2700,  category: 'Food',          type: 'expense' },
  { id: '36', date: '2025-02-07', description: 'Metro Card Recharge',    amount: 500,   category: 'Transport',     type: 'expense' },
  { id: '37', date: '2025-02-10', description: 'Valentine Dinner',       amount: 3400,  category: 'Food',          type: 'expense' },
  { id: '38', date: '2025-02-12', description: 'Freelance Work',         amount: 20000, category: 'Freelance',     type: 'income'  },
  { id: '39', date: '2025-02-14', description: 'BSNL Internet',          amount: 999,   category: 'Utilities',     type: 'expense' },
  { id: '40', date: '2025-02-18', description: 'Amazon Order',           amount: 4100,  category: 'Shopping',      type: 'expense' },
  { id: '41', date: '2025-02-20', description: 'Zerodha SIP',            amount: 10000, category: 'Investment',    type: 'expense' },
  { id: '42', date: '2025-02-25', description: 'Movie Tickets',          amount: 900,   category: 'Entertainment', type: 'expense' },
];

export const monthlyTrendData = [
  { month: 'Nov', income: 90000, expenses: 48000 },
  { month: 'Dec', income: 105000, expenses: 62000 },
  { month: 'Jan', income: 95000, expenses: 53000 },
  { month: 'Feb', income: 105000, expenses: 44599 },
  { month: 'Mar', income: 107000, expenses: 43399 },
  { month: 'Apr', income: 137000, expenses: 61138 },
];

export const CATEGORY_COLORS: Record<string, string> = {
  Housing:       '#6366f1',
  Food:          '#f59e0b',
  Transport:     '#10b981',
  Entertainment: '#ec4899',
  Healthcare:    '#14b8a6',
  Shopping:      '#f97316',
  Utilities:     '#8b5cf6',
  Investment:    '#06b6d4',
  Salary:        '#22c55e',
  Freelance:     '#84cc16',
  Other:         '#94a3b8',
};
