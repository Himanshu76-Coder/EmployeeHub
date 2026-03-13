// Navigation bar component with fixed positioning and routing links
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      backgroundColor: 'rgb(0, 55, 70)',
      borderBottom: '1px solid rgb(0, 55, 70)',
      boxShadow: 'var(--shadow-sm)',
      padding: '1rem 0'
    }}>
      <div style={{ 
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: '48px'
      }}>
        {/* Logo and brand name */}
        <Link to="/" style={{ 
          fontSize: '1.5rem', 
          fontWeight: '700', 
          color: 'white',
          letterSpacing: '-0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          flexShrink: 0
        }}>
          <span style={{ backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '4px', padding: '0.2rem 0.5rem', fontSize: '1.2rem' }}>EM</span> EmployeeManagement
        </Link>
        {/* Navigation links */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/employees" className="navbar-link">Employees</Link>
          <Link to="/employees/add" className="btn btn-primary" style={{ padding: '0.55rem 1.25rem' }}>+ New</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
