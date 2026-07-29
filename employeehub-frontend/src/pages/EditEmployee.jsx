// Form page for editing an existing employee record.
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import employeeService from '../api/employeeService';

const EditEmployee = () => {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch the employee data when the component loads.
  useEffect(() => {
    employeeService.getEmployeeById(id)
      .then(response => {
        setEmployee(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching employee:', error);
        setError('Error fetching employee details.');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    employeeService.updateEmployee(id, employee)
      .then(() => {
        navigate('/employees');
      })
      .catch(error => {
        console.error('Error updating employee:', error);
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError('Network Error. Is the backend running?');
        }
        setSubmitting(false);
      });
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
      Loading employee details...
    </div>
  );

  return (
    <div className="container" style={{ paddingTop: '2.5rem', paddingBottom: '3rem' }}>

      {/* Page header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: 'var(--text-primary)' }}>Edit Employee Record</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Update details for {employee.firstName} {employee.lastName}.</p>
      </div>

      {/* Error message */}
      {error && (
        <div style={{ color: 'var(--danger-color)', marginBottom: '1.5rem', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: 'var(--radius-md)', border: '1px solid #fca5a5' }}>
          {error}
        </div>
      )}

      {/* Employee form */}
      <form onSubmit={handleSubmit} className="card" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" className="form-control" value={employee.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" className="form-control" value={employee.lastName} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input type="email" name="email" className="form-control" value={employee.email} onChange={handleChange} required />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" className="form-control" value={employee.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Designation</label>
            <input type="text" name="designation" className="form-control" value={employee.designation} onChange={handleChange} required />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" className="form-control" value={employee.phoneNumber || ''} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Salary (Annual &#8377;)</label>
            <input type="number" name="salary" className="form-control" value={employee.salary} onChange={handleChange} required />
          </div>
        </div>

        {/* Form actions */}
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <button type="submit" className="btn btn-warning" style={{ padding: '0.75rem 2rem' }} disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Record'}
          </button>
          <Link to="/employees" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
