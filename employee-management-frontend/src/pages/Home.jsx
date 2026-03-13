// Landing page with hero section and feature highlights
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', 
      minHeight: 'calc(100vh - 80px)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      color: 'white'
    }}>
      {/* Decorative background circle */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        right: '-5%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        zIndex: 0
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '4rem', alignItems: 'center' }}>
          {/* Left side - Hero content */}
          <div>
            <div style={{ 
              display: 'inline-block', 
              padding: '0.4rem 1rem', 
              background: 'rgba(16, 185, 129, 0.15)', 
              color: '#34d399', 
              borderRadius: '50px', 
              fontSize: '0.85rem', 
              fontWeight: '600', 
              marginBottom: '1.5rem',
              border: '1px solid rgba(16, 185, 129, 0.3)'
            }}>
              Smart Employee Management
            </div>
            <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
              Manage Your Team with <span style={{ color: '#10b981' }}>Precision.</span>
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.8, marginBottom: '2.5rem', lineHeight: '1.6', maxWidth: '600px' }}>
              The ultimate dashboard for modern Indian organizations. Streamline payroll, track performance, and organize records in one secure workspace.
            </p>
            {/* Call-to-action buttons */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/employees" className="btn btn-primary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                View Dashboard
              </Link>
              <Link to="/employees/add" className="btn btn-secondary" style={{ backgroundColor: 'transparent', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '0.9rem 2rem', fontSize: '1rem' }}>
                + Add Employee
              </Link>
            </div>
          </div>

          {/* Right side - Feature cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transform: 'rotate(-2deg) translateX(-20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#10b981', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>👥</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600' }}>Active Employees</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Real-time synchronization</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>250+</div>
                </div>
            </div>
            <div className="card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', transform: 'rotate(2deg) translateX(20px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>₹</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600' }}>Payroll Efficient</div>
                    <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>Indian INR localization</div>
                  </div>
                  <div style={{ marginLeft: 'auto', fontWeight: 'bold' }}>100%</div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
