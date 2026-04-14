// Layout wrapper component providing consistent structure across pages
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Main content area with top padding to account for fixed navbar */}
      <main style={{ paddingTop: '64px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
