import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4rem',
          alignItems: 'center',
        }}>

          {/* Left — Hero Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.25rem 0.75rem',
              backgroundColor: '#9cf2e2',
              color: '#005047',
              borderRadius: '0.75rem',
              fontSize: '0.75rem',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              alignSelf: 'flex-start',
            }}>
              <span className="material-symbols-outlined" style={{
                fontSize: '0.875rem',
                fontVariationSettings: "'FILL' 1",
              }}>verified</span>
              Workforce Optimization
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: 'clamp(3rem, 5vw, 4.5rem)',
              fontWeight: 800,
              color: '#191c1d',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
            }}>
              Manage Your{' '}
              <span style={{ color: '#005d52' }}>Workforce</span>
              <br />Smarter.
            </h1>

            {/* Subtitle */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.125rem',
              color: '#54606c',
              lineHeight: 1.7,
              maxWidth: '520px',
            }}>
              Bring all your employee data into one simple system. Monitor performance,
              manage tasks, and streamline HR processes to support better decisions and
              efficient team management.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem' }}>
              <Link
                to="/employees"
                className="btn btn-primary"
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 8px 24px 0 rgba(0,93,82,0.18)',
                }}
              >
                Open Dashboard
                <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>arrow_forward</span>
              </Link>
              <Link
                to="/employees/add"
                className="btn btn-secondary"
                style={{ padding: '1rem 2rem', fontSize: '1rem' }}
              >
                +&nbsp; Add Employee
              </Link>
            </div>
          </div>

          {/* Right — Bento Card */}
          <div style={{ position: 'relative' }}>

            {/* Decorative radial blur */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '120%',
              height: '120%',
              background: 'radial-gradient(circle, rgba(0,93,82,0.06) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(40px)',
              zIndex: 0,
              pointerEvents: 'none',
            }} />

            {/* Main Card */}
            <div className="card" style={{
              position: 'relative',
              zIndex: 1,
              padding: '1.5rem',
            }}>

              {/* Office Image */}
              <div style={{
                aspectRatio: '16/10',
                borderRadius: '0.375rem',
                overflow: 'hidden',
                marginBottom: '1.5rem',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(0,93,82,0.20) 0%, transparent 100%)',
                  zIndex: 1,
                }} />
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Corporate Office"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><rect fill="%23e7e8e9" width="1600" height="1000"/><text fill="%2354606c" font-family="sans-serif" font-size="24" x="50%" y="50%" text-anchor="middle">Image unavailable</text></svg>';
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(20%)',
                  }}
                />
              </div>

              {/* Card Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#005d52',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}>
                    Team Performance Overview
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#54606c',
                    fontWeight: 500,
                  }}>
                   Example Data
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{
                  height: '8px',
                  width: '100%',
                  backgroundColor: '#e7e8e9',
                  borderRadius: '999px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: '78%',
                    backgroundColor: '#005d52',
                    borderRadius: '999px',
                  }} />
                </div>

                {/* Stat tiles */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '0.75rem',
                  paddingTop: '0.5rem',
                }}>
                  {[
                    { value: '92%',  label: 'Retention', accent: false },
                    { value: '14k',  label: 'Total Employees',    accent: true  },
                    { value: '24.6K',label: 'Tasks Completed',    accent: false },
                  ].map(({ value, label, accent }) => (
                    <div key={label} style={{
                      textAlign: 'center',
                      padding: '0.75rem',
                      backgroundColor: '#f8f9fa',
                      borderRadius: '0.5rem',
                      border: accent ? '1px solid rgba(0,93,82,0.10)' : 'none',
                    }}>
                      <span style={{
                        display: 'block',
                        fontFamily: 'Manrope, sans-serif',
                        fontSize: '1.25rem',
                        fontWeight: 700,
                        color: accent ? '#005d52' : '#191c1d',
                      }}>{value}</span>
                      <span style={{
                        fontSize: '0.625rem',
                        color: '#54606c',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '-0.02em',
                      }}>{label}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────── */}
      <footer className="container" style={{
        paddingTop: '3rem',
        paddingBottom: '3rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        borderTop: '1px solid rgba(189,201,197,0.10)',
      }}>

        {/* Brand + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '1.25rem',
            fontWeight: 800,
            color: '#003d35',
            letterSpacing: '-0.04em',
          }}>
            EmployeeHub
          </span>
          <span style={{
            height: '16px',
            width: '1px',
            backgroundColor: 'rgba(189,201,197,0.50)',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'Manrope, sans-serif',
            fontSize: '0.875rem',
            color: '#54606c',
            fontWeight: 500,
          }}>
            Smart Workforce Management
          </span>
        </div>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy', 'Security', 'Documentation'].map((label) => (
            <span key={label} style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '0.875rem',
              fontWeight: 700,
              color: '#54606c',
            }}>
              {label}
            </span>
          ))}
        </div>

      </footer>
    </>
  );
};

export default Home;
