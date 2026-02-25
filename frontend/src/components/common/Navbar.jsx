import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">📈 StockDash</Link>
      </div>

      <div className="navbar-links">
        {user ? (
          <>
            <span className="welcome-text">Hi, {user.name} 👋</span>

            <Link to="/dashboard">Dashboard</Link>

            {user.role === 'admin' ? (
              <Link to="/admin">Admin Panel</Link>
            ) : (
              <Link to="/user-panel">My Trades</Link>
            )}

            <button onClick={toggleTheme} className="theme-btn">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
            <button onClick={toggleTheme} className="theme-btn">
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
