// Employee list page with table view, search, and delete functionality.
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import employeeService from '../api/employeeService';
import ConfirmModal from '../components/ConfirmModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  // Filter employees by search query - matches name, email, department, or designation.
  const filteredEmployees = query.trim()
    ? employees.filter(emp => {
        const q = query.toLowerCase();
        return (
          emp.firstName?.toLowerCase().includes(q) ||
          emp.lastName?.toLowerCase().includes(q) ||
          `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(q) ||
          emp.email?.toLowerCase().includes(q) ||
          emp.department?.toLowerCase().includes(q) ||
          emp.designation?.toLowerCase().includes(q)
        );
      })
    : employees;

  // Fetch all employees once on initial mount.
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Loads all employees in a single request so search works across the full dataset.
  const fetchEmployees = () => {
    setLoading(true);
    employeeService.getEmployees(0, 1000, 'employeeId')
      .then(response => {
        setEmployees(response.data.data.content || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  const openDeleteModal = (id) => {
    setSelectedEmpId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedEmpId(null);
  };

  const confirmDelete = () => {
    if (selectedEmpId) {
      setIsDeleting(true);
      employeeService.deleteEmployee(selectedEmpId)
        .then(() => {
          fetchEmployees();
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

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
      Loading employee data...
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem', minHeight: 'calc(100vh - 64px)' }}>

      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Employee List</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your organization&apos;s employee records.</p>
        </div>
        <Link to="/employees/add" className="btn btn-primary">
          <span style={{ marginRight: '0.5rem' }}>+</span> Add Employee
        </Link>
      </div>

      {/* Employee table */}
      <div className="card">
        <div className="table-wrapper">
          <table>
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
              {filteredEmployees.map(emp => (
                <tr key={emp.employeeId}>
                  <td>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {emp.firstName} {emp.lastName}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {emp.email} &bull; {emp.phoneNumber || 'No phone'}
                    </div>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>&#8377;{emp.salary != null ? emp.salary.toLocaleString('en-IN') : '0'}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <Link
                        to={`/employees/edit/${emp.employeeId}`}
                        className="btn btn-warning"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', minWidth: '70px', textAlign: 'center' }}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => openDeleteModal(emp.employeeId)}
                        className="btn btn-danger"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', minWidth: '70px', textAlign: 'center' }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty state when no employees match the search or table is empty */}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{query ? '🔍' : '📭'}</div>
                    {query
                      ? `No employees found matching "${query}".`
                      : 'No employees found. Add some to get started.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

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
