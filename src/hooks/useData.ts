import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Transaction } from '../types';

export function useFilteredTransactions(): Transaction[] {
  const { transactions, filters } = useApp();
  return useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== 'all') result = result.filter(t => t.type === filters.type);
    if (filters.category !== 'all') result = result.filter(t => t.category === filters.category);

    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === 'date') cmp = a.date.localeCompare(b.date);
      else cmp = a.amount - b.amount;
      return filters.sortDir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [transactions, filters]);
}

export function useSummary() {
  const { transactions } = useApp();
  return useMemo(() => {
    // Current month (April 2025 data)
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const balance = income - expenses;

    const aprIncome = transactions.filter(t => t.type === 'income' && t.date.startsWith('2025-04')).reduce((s, t) => s + t.amount, 0);
    const aprExpenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith('2025-04')).reduce((s, t) => s + t.amount, 0);
    const marIncome = transactions.filter(t => t.type === 'income' && t.date.startsWith('2025-03')).reduce((s, t) => s + t.amount, 0);
    const marExpenses = transactions.filter(t => t.type === 'expense' && t.date.startsWith('2025-03')).reduce((s, t) => s + t.amount, 0);

    // Spending by category (expenses only)
    const categoryMap: Record<string, number> = {};
    transactions.filter(t => t.type === 'expense').forEach(t => {
      categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
    });
    const spendingByCategory = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const highestCategory = spendingByCategory[0];

    return { income, expenses, balance, aprIncome, aprExpenses, marIncome, marExpenses, spendingByCategory, highestCategory };
  }, [transactions]);
}
