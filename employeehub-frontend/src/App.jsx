// Root component that defines all application routes.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import EditEmployee from './pages/EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        {/* All routes are wrapped in Layout so the navbar is always visible */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/add" element={<AddEmployee />} />
          <Route path="/employees/edit/:id" element={<EditEmployee />} />
          {/* Catch-all route shown when no other route matches */}
          <Route path="*" element={
            <div style={{ textAlign: 'center', padding: '5rem', color: 'var(--text-secondary)' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                404 — Page Not Found
              </h2>
              <p>The page you are looking for does not exist.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
