// Service class for employee API operations
import axios from 'axios';

const EMPLOYEE_API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1/employees';

class EmployeeService {

    // Fetch paginated list of employees with sorting
    getEmployees(page = 0, size = 10, sortBy = 'employeeId') {
        return axios.get(`${EMPLOYEE_API_BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
    }

    // Fetch single employee by ID
    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }

    // Create new employee record
    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // Update existing employee record
    updateEmployee(employeeId, employee) {
        return axios.put(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, employee);
    }

    // Delete employee by ID
    deleteEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }
}

// Export singleton instance
export default new EmployeeService();
