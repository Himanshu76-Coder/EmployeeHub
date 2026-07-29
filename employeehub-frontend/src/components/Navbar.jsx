// Navbar — fixed top bar with brand, nav links and quick-add button.
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'var(--surface-container-lowest)',
      zIndex: 50,
      boxShadow: 'var(--shadow-md)',
      borderBottom: '1.5px solid var(--border-strong)',
    }}>
      <div className="container navbar-layout">

        {/* Brand */}
        <Link to="/" style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: '1.5rem',
          fontWeight: 800,
          color: 'var(--primary)',
          letterSpacing: '-0.04em',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          EmployeeHub
        </Link>

        {/* Nav Links */}
        <nav className="navbar-nav">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/employees" className="navbar-link">Employees</Link>
        </nav>

        {/* Add Employee Button */}
        <Link to="/employees/add" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', marginRight: '0.25rem' }}>add</span>
          <span className="hide-on-mobile">New</span>
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
