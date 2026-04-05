import { LayoutDashboard, ArrowLeftRight, Lightbulb, Moon, Sun, ShieldCheck, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NavPage, Role } from '../types';

const navItems: { page: NavPage; label: string; icon: React.ReactNode }[] = [
  { page: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
  { page: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={16} /> },
  { page: 'insights', label: 'Insights', icon: <Lightbulb size={16} /> },
];

export default function Sidebar() {
  const { activePage, setActivePage, role, setRole, darkMode, toggleDarkMode } = useApp();

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">F</div>
        <span className="logo-name">Finova</span>
      </div>

      <span className="nav-label">Menu</span>
      {navItems.map(item => (
        <button
          key={item.page}
          className={`nav-item ${activePage === item.page ? 'active' : ''}`}
          onClick={() => setActivePage(item.page)}
        >
          {item.icon}
          {item.label}
        </button>
      ))}

      <div className="sidebar-footer">
        <div className="role-selector">
          <span className="role-label">Active Role</span>
          <select
            className="role-select"
            value={role}
            onChange={e => setRole(e.target.value as Role)}
          >
            <option value="admin">⚙️  Admin</option>
            <option value="viewer">👁  Viewer</option>
          </select>
        </div>

        <div className="dark-toggle" onClick={toggleDarkMode} style={{ cursor: 'pointer' }}>
          <div className={`toggle-track ${darkMode ? 'on' : ''}`}>
            <div className="toggle-thumb" />
          </div>
          {darkMode ? <Moon size={13} /> : <Sun size={13} />}
          <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
        </div>

        <div style={{ padding: '4px 4px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
          {role === 'admin' ? <ShieldCheck size={13} color="var(--accent)" /> : <Eye size={13} color="var(--income)" />}
          <span className={`role-badge ${role}`}>{role === 'admin' ? 'Admin Access' : 'View Only'}</span>
        </div>
      </div>
    </nav>
  );
}
