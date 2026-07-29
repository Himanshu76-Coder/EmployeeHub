// Form page for adding a new employee record.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import employeeService from '../api/employeeService';

const AddEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    designation: '',
    phoneNumber: '',
    salary: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    employeeService.createEmployee(employee)
      .then(() => {
        navigate('/employees');
      })
      .catch(error => {
        console.error('Error creating employee:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Network Error. Is the backend running?');
        }
        setSubmitting(false);
      });
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

      {/* Page header */}
      <div className="page-header">
        <h2>Add New Employee</h2>
        <p>Enter the details of the new team member.</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="alert-error">
          <span className="material-symbols-outlined" style={{ fontSize: '1.125rem', flexShrink: 0 }}>error</span>
          {error}
        </div>
      )}

      {/* Employee form */}
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2rem 2.5rem 2.5rem' }}>
        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" className="form-control" value={employee.firstName} onChange={handleChange} required placeholder="e.g. John" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" className="form-control" value={employee.lastName} onChange={handleChange} required placeholder="e.g. Doe" />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" className="form-control" value={employee.email} onChange={handleChange} required placeholder="john.doe@company.com" />
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" className="form-control" value={employee.department} onChange={handleChange} required placeholder="e.g. Engineering" />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input type="text" name="designation" className="form-control" value={employee.designation} onChange={handleChange} required placeholder="e.g. Software Engineer" />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Phone Number <span style={{ fontWeight: 400, color: 'var(--outline-variant)' }}>(Optional)</span></label>
            <input type="text" name="phoneNumber" className="form-control" value={employee.phoneNumber} onChange={handleChange} placeholder="e.g. +91 98765 43210" />
          </div>
          <div className="form-group">
            <label>Salary (Annual &#8377;)</label>
            <input type="number" name="salary" className="form-control" value={employee.salary} onChange={handleChange} required placeholder="e.g. 800000" />
          </div>
        </div>

        {/* Form actions */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 2rem' }} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Employee'}
          </button>
          <Link to="/employees" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
