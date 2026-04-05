import { useState } from 'react';
import { Search, Plus, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useFilteredTransactions } from '../hooks/useData';
import { Transaction, Category } from '../types';
import { CATEGORY_COLORS } from '../data/mockData';
import TransactionModal from './TransactionModal';

const CATEGORIES: Category[] = [
  'Housing','Food','Transport','Entertainment','Healthcare',
  'Shopping','Utilities','Investment','Salary','Freelance','Other'
];

const CATEGORY_EMOJIS: Record<string, string> = {
  Housing: '🏠', Food: '🍔', Transport: '🚗', Entertainment: '🎬',
  Healthcare: '💊', Shopping: '🛍️', Utilities: '💡', Investment: '📈',
  Salary: '💼', Freelance: '💻', Other: '📌',
};

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Transactions() {
  const { filters, setFilters, role, deleteTransaction } = useApp();
  const filtered = useFilteredTransactions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const openAdd = () => { setEditing(null); setModalOpen(true); };
  const openEdit = (t: Transaction) => { setEditing(t); setModalOpen(true); };

  return (
    <div className="card" style={{ flex: 1 }}>
      {/* Toolbar */}
      <div className="tx-toolbar">
        <div className="search-wrap">
          <Search />
          <input
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilters({ search: e.target.value })}
          />
        </div>
        <select
          className="filter-select"
          value={filters.type}
          onChange={e => setFilters({ type: e.target.value as 'all' | 'income' | 'expense' })}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select
          className="filter-select"
          value={filters.category}
          onChange={e => setFilters({ category: e.target.value as Category | 'all' })}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <button
          className="sort-btn"
          onClick={() => setFilters({
            sortBy: filters.sortBy === 'date' ? 'amount' : 'date',
            sortDir: 'desc'
          })}
        >
          <ArrowUpDown size={13} />
          Sort: {filters.sortBy === 'date' ? 'Date' : 'Amount'}
        </button>
        {role === 'admin' && (
          <button className="add-btn" onClick={openAdd}>
            <Plus size={14} />
            Add
          </button>
        )}
      </div>

      {/* Result count */}
      <div style={{ fontSize: 12, color: 'var(--text3)', marginBottom: 12, paddingLeft: 4 }}>
        {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <Search size={32} />
          <p>No transactions match your filters.</p>
        </div>
      ) : (
        <div className="tx-list">
          {filtered.map(tx => (
            <div className="tx-row" key={tx.id}>
              <div
                className="tx-icon"
                style={{ background: CATEGORY_COLORS[tx.category] + '22' }}
              >
                {CATEGORY_EMOJIS[tx.category] || '📌'}
              </div>
              <div className="tx-info">
                <div className="tx-desc">{tx.description}</div>
                <div className="tx-meta">
                  {new Date(tx.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
              <span className="tx-cat-pill">{tx.category}</span>
              <span className={`tx-amount ${tx.type === 'income' ? 'inc' : 'exp'}`}>
                {tx.type === 'income' ? '+' : '−'}{fmt(tx.amount)}
              </span>
              {role === 'admin' && (
                <div className="tx-actions">
                  <button className="icon-btn edit" onClick={() => openEdit(tx)} title="Edit">
                    <Pencil size={12} />
                  </button>
                  <button className="icon-btn" onClick={() => deleteTransaction(tx.id)} title="Delete">
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {modalOpen && (
        <TransactionModal existing={editing} onClose={() => setModalOpen(false)} />
      )}
    </div>
  );
}
