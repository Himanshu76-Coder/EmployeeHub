import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');

  // Sync input with URL param when route changes
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

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      backgroundColor: '#ffffff',
      zIndex: 50,
      boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
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
          color: '#005d52',
          letterSpacing: '-0.04em',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          EmployeeManagement
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          backgroundColor: '#e7e8e9',
          padding: '0.375rem 1rem',
          borderRadius: '0.5rem',
          width: '256px',
          border: '1px solid rgba(189,201,197,0.20)',
        }}>
          <span className="material-symbols-outlined" style={{
            fontSize: '1.125rem',
            color: '#6e7976',
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
              color: '#3e4946',
              width: '100%',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </form>

        {/* Nav Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link
            to="/"
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#54606c', letterSpacing: '-0.01em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = '#005d52'}
            onMouseLeave={(e) => e.target.style.color = '#54606c'}
          >Home</Link>
          <Link
            to="/employees"
            style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 600, fontSize: '0.875rem', color: '#54606c', letterSpacing: '-0.01em', transition: 'color 0.2s' }}
            onMouseEnter={(e) => e.target.style.color = '#005d52'}
            onMouseLeave={(e) => e.target.style.color = '#54606c'}
          >Employees</Link>
        </nav>

        {/* CTA */}
        <Link to="/employees/add" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem' }}>
          +&nbsp; New
        </Link>

      </div>
    </header>
  );
};

export default Navbar;
