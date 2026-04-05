import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { useSummary } from '../hooks/useData';
import { monthlyTrendData, CATEGORY_COLORS } from '../data/mockData';
import { useApp } from '../context/AppContext';

const fmt = (n: number) => '₹' + n.toLocaleString('en-IN');

export default function Dashboard() {
  const { balance, income, expenses, spendingByCategory } = useSummary();
  const { darkMode } = useApp();

  const axisColor = darkMode ? '#6b6760' : '#9c9690';
  const gridColor = darkMode ? '#2e2c29' : '#e8e5df';
  const tooltipBg = darkMode ? '#1f1e1c' : '#ffffff';

  const pieData = spendingByCategory.slice(0, 6);

  return (
    <>
      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card balance">
          <div className="sum-icon balance"><Wallet size={18} /></div>
          <span className="sum-label">Net Balance</span>
          <span className="sum-value">{fmt(balance)}</span>
          <span className="sum-sub">Total across all time</span>
        </div>
        <div className="summary-card income">
          <div className="sum-icon income"><TrendingUp size={18} /></div>
          <span className="sum-label">Total Income</span>
          <span className="sum-value income-val">{fmt(income)}</span>
          <span className="sum-sub">All income streams</span>
        </div>
        <div className="summary-card expense">
          <div className="sum-icon expense"><TrendingDown size={18} /></div>
          <span className="sum-label">Total Expenses</span>
          <span className="sum-value expense-val">{fmt(expenses)}</span>
          <span className="sum-sub">All spending</span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Area chart */}
        <div className="card">
          <div className="card-title">Balance Trend — 6 Months</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTrendData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2d9e6b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2d9e6b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#d94f3d" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#d94f3d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} tickFormatter={v => '₹' + (v/1000) + 'k'} />
              <Tooltip
                contentStyle={{ background: tooltipBg, border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => fmt(v)}
              />
              <Area type="monotone" dataKey="income" stroke="#2d9e6b" strokeWidth={2} fill="url(#incGrad)" name="Income" />
              <Area type="monotone" dataKey="expenses" stroke="#d94f3d" strokeWidth={2} fill="url(#expGrad)" name="Expenses" />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12, color: axisColor }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="card">
          <div className="card-title">Spending Breakdown</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#94a3b8'} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: tooltipBg, border: '1px solid var(--border)', borderRadius: 10, fontSize: 12 }}
                formatter={(v: number) => fmt(v)}
              />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: axisColor }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Bar breakdown */}
      <div className="card">
        <div className="card-title">Top Spending Categories</div>
        <div className="cat-bar-list">
          {spendingByCategory.slice(0, 7).map(cat => {
            const pct = (cat.value / spendingByCategory[0].value) * 100;
            return (
              <div className="cat-bar-row" key={cat.name}>
                <div className="cat-bar-header">
                  <span className="cat-bar-name">{cat.name}</span>
                  <span className="cat-bar-val">{fmt(cat.value)}</span>
                </div>
                <div className="cat-bar-track">
                  <div
                    className="cat-bar-fill"
                    style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat.name] || '#94a3b8' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
