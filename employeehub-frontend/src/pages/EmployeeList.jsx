// Employee list page with table view, search, salary filter, and delete functionality.
import { useState, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import employeeService from '../api/employeeService';
import ConfirmModal from '../components/ConfirmModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const salaryBand = searchParams.get('salaryBand') || '';

  const searchTimeoutRef = useRef(null);

  // Debounced search — updates URL 400ms after the user stops typing.
  // Uses an uncontrolled input + ref so the input never loses focus.
  const handleSearchChange = (e) => {
    const value = e.target.value;
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      const newParams = new URLSearchParams(searchParams);
      if (value) { newParams.set('q', value); } else { newParams.delete('q'); }
      setSearchParams(newParams, { replace: true });
      setCurrentPage(0);
    }, 400);
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) { newParams.set(key, value); } else { newParams.delete(key); }
    setSearchParams(newParams, { replace: true });
    setCurrentPage(0);
  };

  // Re-fetch whenever page, keyword or salary band changes.
  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage, query, salaryBand]);

  // Loads one page of employees with active filters.
  const fetchEmployees = (pageIndex) => {
    setLoading(true);
    let minSalaryFilter = '';
    let maxSalaryFilter = '';
    if (salaryBand) {
      const parts = salaryBand.split('-');
      if (parts.length === 2) {
        minSalaryFilter = parts[0];
        maxSalaryFilter = parts[1];
      } else if (salaryBand.endsWith('+')) {
        minSalaryFilter = salaryBand.replace('+', '');
      }
    }

    employeeService.getEmployees(pageIndex, 5, 'employeeId', {
      keyword: query,
      minSalary: minSalaryFilter,
      maxSalary: maxSalaryFilter,
    })
      .then(response => {
        setEmployees(response.data.data.content || []);
        setTotalPages(response.data.data.totalPages || 0);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  const openDeleteModal = (id) => { setSelectedEmpId(id); setIsModalOpen(true); };
  const closeDeleteModal = () => { setIsModalOpen(false); setSelectedEmpId(null); };

  const confirmDelete = () => {
    if (selectedEmpId) {
      setIsDeleting(true);
      employeeService.deleteEmployee(selectedEmpId)
        .then(() => {
          // If last item on a non-first page, go back one page.
          if (employees.length === 1 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
          } else {
            fetchEmployees(currentPage);
          }
          closeDeleteModal();
          setIsDeleting(false);
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
          closeDeleteModal();
          setIsDeleting(false);
        });
    }
  };

  const hasFilters = !!(query || salaryBand);

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem', minHeight: 'calc(100vh - 64px)' }}>

      {/* Page header + action bar */}
      <div className="list-header-wrapper">
        <div className="page-header" style={{ marginBottom: 0 }}>
          <h2>Employee List</h2>
          <p>Manage your organization&apos;s employee records.</p>
        </div>

        {/* Filters + CTA */}
        <div className="list-header-actions">

          {/* Salary Range dropdown */}
          <select
            className="form-select"
            value={salaryBand}
            onChange={(e) => handleFilterChange('salaryBand', e.target.value)}
            style={{ height: '40px', width: 'auto', fontSize: '0.875rem' }}
          >
            <option value="">All Salaries</option>
            <option value="0-50000">Under ₹50,000</option>
            <option value="50000-100000">₹50,000 – ₹1,00,000</option>
            <option value="100000-150000">₹1,00,000 – ₹1,50,000</option>
            <option value="150000+">Over ₹1,50,000</option>
          </select>

          {/* Search bar */}
          <div className="search-bar" style={{ width: '240px' }}>
            <span className="material-symbols-outlined">search</span>
            <input
              type="text"
              placeholder="Search name or email..."
              defaultValue={query}
              onChange={handleSearchChange}
            />
          </div>

          {/* Add Employee button */}
          <Link
            to="/employees/add"
            className="btn btn-primary"
            style={{ height: '40px', padding: '0 1.25rem' }}
          >
            <span className="material-symbols-outlined" style={{ marginRight: '0.375rem', fontSize: '1.125rem' }}>add</span>
            <span className="hide-on-mobile">Add Employee</span>
          </Link>
        </div>
      </div>

      {/* Employee table */}
      <div className="card">
        <div
          className="table-wrapper"
          style={{
            opacity: loading ? 0.55 : 1,
            transition: 'opacity 0.2s ease-in-out',
            pointerEvents: loading ? 'none' : 'auto',
          }}
        >
          <table className="responsive-table">
            <thead>
              <tr>
                <th>Employee Info</th>
                <th>Department</th>
                <th>Designation</th>
                <th>Salary</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Initial load: empty employees + loading */}
              {loading && employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="state-cell">
                    <span className="state-icon">⏳</span>
                    Loading employee data...
                  </td>
                </tr>
              ) : employees.length === 0 ? (
                /* Empty state */
                <tr>
                  <td colSpan="5" className="state-cell">
                    <span className="state-icon">{hasFilters ? '🔍' : '📭'}</span>
                    {hasFilters
                      ? 'No employees found matching the filters.'
                      : 'No employees found. Add some to get started.'}
                  </td>
                </tr>
              ) : (
                employees.map(emp => (
                  <tr key={emp.employeeId}>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--on-surface)', marginBottom: '0.125rem' }}>
                        {emp.firstName} {emp.lastName}
                      </div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                        {emp.email} &bull; {emp.phoneNumber || 'No phone'}
                      </div>
                    </td>
                    <td style={{ color: 'var(--on-surface-variant)' }}>{emp.department}</td>
                    <td style={{ color: 'var(--on-surface-variant)' }}>{emp.designation}</td>
                    <td style={{ fontWeight: 600 }}>
                      &#8377;{emp.salary != null ? emp.salary.toLocaleString('en-IN') : '0'}
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                        <Link
                          to={`/employees/edit/${emp.employeeId}`}
                          className="btn btn-warning"
                          style={{ padding: '0.35rem 0.875rem', fontSize: '0.8125rem', minWidth: '68px' }}
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(emp.employeeId)}
                          className="btn btn-danger"
                          style={{ padding: '0.35rem 0.875rem', fontSize: '0.8125rem', minWidth: '68px' }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '1.25rem',
        }}>
          <span className="pagination-info">
            Page {currentPage + 1} of {totalPages}
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-secondary"
              style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}
              disabled={currentPage >= totalPages - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete Employee"
        message="Are you sure you want to delete this employee? This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default EmployeeList;
