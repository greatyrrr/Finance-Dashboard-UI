import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { Trophy, TrendingDown, TrendingUp, PiggyBank, Target } from 'lucide-react';
import { useSummary } from '../hooks/useData';
import { useApp } from '../context/AppContext';
import { monthlyTrendData } from '../data/mockData';

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Insights() {
  const { highestCategory, aprIncome, aprExpenses, marIncome, marExpenses, spendingByCategory } = useSummary();
  const { darkMode } = useApp();

  const axisColor = darkMode ? '#6b6760' : '#9c9690';
  const gridColor = darkMode ? '#2e2c29' : '#e8e5df';
  const tooltipBg = darkMode ? '#1f1e1c' : '#ffffff';

  const savingsRate = aprIncome > 0 ? Math.round(((aprIncome - aprExpenses) / aprIncome) * 100) : 0;
  const expenseChange = marExpenses > 0 ? Math.round(((aprExpenses - marExpenses) / marExpenses) * 100) : 0;
  const totalExpenses = spendingByCategory.reduce((s, c) => s + c.value, 0);
  const topCatPct = highestCategory ? Math.round((highestCategory.value / totalExpenses) * 100) : 0;

  return (
    <>
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-icon" style={{ background: 'var(--accent-bg)' }}>
            <Trophy size={20} color="var(--accent)" />
          </div>
          <div className="insight-val">{highestCategory?.name || '—'}</div>
          <div className="insight-desc">
            Highest spending category · {fmt(highestCategory?.value || 0)} ({topCatPct}% of total expenses)
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ background: 'var(--income-bg)' }}>
            <PiggyBank size={20} color="var(--income)" />
          </div>
          <div className="insight-val" style={{ color: 'var(--income)' }}>{savingsRate}%</div>
          <div className="insight-desc">
            Savings rate this month (April 2025) · Saved {fmt(aprIncome - aprExpenses)} out of {fmt(aprIncome)} income
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ background: expenseChange > 0 ? 'var(--expense-bg)' : 'var(--income-bg)' }}>
            {expenseChange > 0
              ? <TrendingUp size={20} color="var(--expense)" />
              : <TrendingDown size={20} color="var(--income)" />}
          </div>
          <div className="insight-val" style={{ color: expenseChange > 0 ? 'var(--expense)' : 'var(--income)' }}>
            {expenseChange > 0 ? '+' : ''}{expenseChange}%
          </div>
          <div className="insight-desc">
            Month-over-month expense change (Mar → Apr) · {fmt(marExpenses)} → {fmt(aprExpenses)}
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-icon" style={{ background: 'var(--accent-bg)' }}>
            <Target size={20} color="var(--accent)" />
          </div>
          <div className="insight-val">{fmt(marIncome - marExpenses)}</div>
          <div className="insight-desc">
            Last month's net savings (March 2025) · Income {fmt(marIncome)} − Expenses {fmt(marExpenses)}
          </div>
        </div>
      </div>

      {/* Monthly comparison bar chart */}
      <div className="card">
        <div className="card-title">Monthly Income vs Expenses</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthlyTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v/1000) + 'k'} />
            <Tooltip
              contentStyle={{ background: tooltipBg, border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
              formatter={(v: number) => fmt(v)}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: axisColor }} />
            <Bar dataKey="income" fill="#2d9e6b" radius={[5, 5, 0, 0]} name="Income" maxBarSize={40} />
            <Bar dataKey="expenses" fill="#d94f3d" radius={[5, 5, 0, 0]} name="Expenses" maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Spending distribution */}
      <div className="card">
        <div className="card-title">Full Spending Distribution</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12, marginTop: 4 }}>
          {spendingByCategory.map(cat => {
            const pct = Math.round((cat.value / totalExpenses) * 100);
            return (
              <div key={cat.name} style={{
                background: 'var(--surface2)',
                borderRadius: 'var(--radius-sm)',
                padding: '14px 16px',
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text2)' }}>{cat.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)' }}>{pct}%</span>
                </div>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--text)' }}>
                  {fmt(cat.value)}
                </span>
                <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct}%`, background: 'var(--accent)', borderRadius: 2 }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
