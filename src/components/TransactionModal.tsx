import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Transaction, Category, TransactionType } from '../types';
import { useApp } from '../context/AppContext';

const CATEGORIES: Category[] = [
  'Housing','Food','Transport','Entertainment','Healthcare',
  'Shopping','Utilities','Investment','Salary','Freelance','Other'
];

interface Props {
  existing?: Transaction | null;
  onClose: () => void;
}

export default function TransactionModal({ existing, onClose }: Props) {
  const { addTransaction, updateTransaction } = useApp();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'Food' as Category,
    type: 'expense' as TransactionType,
    date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (existing) {
      setForm({
        description: existing.description,
        amount: existing.amount.toString(),
        category: existing.category,
        type: existing.type,
        date: existing.date,
      });
    }
  }, [existing]);

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    const data = {
      description: form.description,
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };
    if (existing) {
      updateTransaction({ ...data, id: existing.id });
    } else {
      addTransaction(data);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 className="modal-title" style={{ marginBottom: 0 }}>
            {existing ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="icon-btn" onClick={onClose}><X size={15} /></button>
        </div>

        <div className="form-field">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            placeholder="e.g. Grocery shopping"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-field">
            <label className="form-label">Amount (₹)</label>
            <input
              className="form-input"
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Date</label>
            <input
              className="form-input"
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="form-field">
            <label className="form-label">Type</label>
            <select
              className="form-select"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value as TransactionType }))}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit}>
            {existing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}
