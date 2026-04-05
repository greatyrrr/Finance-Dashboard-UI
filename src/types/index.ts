export type TransactionType = 'income' | 'expense';
export type Role = 'admin' | 'viewer';
export type Category =
  | 'Housing'
  | 'Food'
  | 'Transport'
  | 'Entertainment'
  | 'Healthcare'
  | 'Shopping'
  | 'Utilities'
  | 'Investment'
  | 'Salary'
  | 'Freelance'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type NavPage = 'dashboard' | 'transactions' | 'insights';
