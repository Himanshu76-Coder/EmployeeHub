// Employee list page with table view and delete functionality
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import employeeService from '../api/employeeService';
import ConfirmModal from '../components/ConfirmModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmpId, setSelectedEmpId] = useState(null);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employee list from API
  const fetchEmployees = () => {
    employeeService.getEmployees()
      .then(response => {
        setEmployees(response.data.data.content || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
        setLoading(false);
      });
  };

  // Open delete confirmation modal
  const openDeleteModal = (id) => {
    setSelectedEmpId(id);
    setIsModalOpen(true);
  };

  // Close modal and reset selection
  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedEmpId(null);
  };

  // Confirm and execute delete operation
  const confirmDelete = () => {
    if (selectedEmpId) {
      employeeService.deleteEmployee(selectedEmpId)
        .then(() => {
          fetchEmployees();
          closeDeleteModal();
        })
        .catch(error => {
          console.error('Error deleting employee:', error);
          closeDeleteModal();
        });
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>Loading employee data...</div>;

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem', minHeight: 'calc(100vh - 80px)' }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Employee List</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your organization's employee records.</p>
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
              {employees.map(emp => (
                <tr key={emp.employeeId}>
                  <td>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{emp.firstName} {emp.lastName}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {emp.email} • {emp.phoneNumber || 'No phone'}
                    </div>
                  </td>
                  <td>{emp.department}</td>
                  <td>{emp.designation}</td>
                  <td>₹{emp.salary != null ? emp.salary.toLocaleString('en-IN') : '0'}</td>
                  <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                      <Link to={`/employees/edit/${emp.employeeId}`} className="btn btn-warning" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', minWidth: '70px', textAlign: 'center' }}>Edit</Link>
                      <button onClick={() => openDeleteModal(emp.employeeId)} className="btn btn-danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', minWidth: '70px', textAlign: 'center' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Empty state */}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📭</div>
                    No employees found. Add some to get started.
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
      />
    </div>
  );
};

export default EmployeeList;
