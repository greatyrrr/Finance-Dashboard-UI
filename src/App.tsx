import { useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

const now = new Date().toLocaleDateString('en-IN', {
  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

function AppContent() {
  const { activePage, darkMode } = useApp();

  return (
    <div className={`app-shell${darkMode ? ' dark' : ''}`}>
      <Sidebar />
      <div className="main">
        <div className="topbar">
          <h1 className="page-title">{PAGE_TITLES[activePage]}</h1>
          <div className="topbar-right">
            <span className="topbar-date">{now}</span>
          </div>
        </div>
        <div className="page-content">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'transactions' && <Transactions />}
          {activePage === 'insights' && <Insights />}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
