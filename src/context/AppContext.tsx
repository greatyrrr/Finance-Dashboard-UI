import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Transaction, Role, NavPage, Category, TransactionType } from '../types';
import { mockTransactions } from '../data/mockData';

interface Filters {
  search: string;
  type: 'all' | TransactionType;
  category: Category | 'all';
  sortBy: 'date' | 'amount';
  sortDir: 'asc' | 'desc';
}

interface AppContextValue {
  transactions: Transaction[];
  role: Role;
  setRole: (r: Role) => void;
  activePage: NavPage;
  setActivePage: (p: NavPage) => void;
  filters: Filters;
  setFilters: (f: Partial<Filters>) => void;
  addTransaction: (t: Omit<Transaction, 'id'>) => void;
  updateTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

const defaultFilters: Filters = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'date',
  sortDir: 'desc',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [role, setRole] = useState<Role>('admin');
  const [activePage, setActivePage] = useState<NavPage>('dashboard');
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);
  const [darkMode, setDarkMode] = useState(false);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, 'id'>) => {
    const newTx: Transaction = { ...t, id: Date.now().toString() };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const updateTransaction = useCallback((updated: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === updated.id ? updated : t));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode(d => !d), []);

  return (
    <AppContext.Provider value={{
      transactions, role, setRole,
      activePage, setActivePage,
      filters, setFilters,
      addTransaction, updateTransaction, deleteTransaction,
      darkMode, toggleDarkMode,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
