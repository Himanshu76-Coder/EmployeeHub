import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  // Sync the search input with the URL query param when the route changes.
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
  }, [location]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      navigate(`/employees?q=${encodeURIComponent(value.trim())}`);
    } else {
      navigate('/employees');
    }
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: 'var(--surface-container-lowest)',
      zIndex: 50,
      boxShadow: 'var(--shadow-sm)',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
      }}>

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

        {/* Search Bar - navigates to /employees with ?q= query param on each keystroke */}
        <form onSubmit={(e) => e.preventDefault()} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: 'var(--surface-container-high)',
          padding: '0.375rem 1rem',
          borderRadius: '0.5rem',
          width: '256px',
          border: '1px solid rgba(189,201,197,0.20)',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '1.125rem',
            color: 'var(--on-surface-variant)',
            userSelect: 'none',
          }}>search</span>
          <input
            type="text"
            placeholder="Search Employee..."
            value={query}
            onChange={handleChange}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              color: 'var(--on-surface-variant)',
              width: '100%',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </form>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/employees" className="navbar-link">Employees</Link>
        </nav>

        {/* Add Employee Button */}
        <Link to="/employees/add" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
          +&nbsp; New
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
