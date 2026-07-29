package com.employeehub.service;

import org.springframework.data.domain.Page;
import com.employeehub.dto.EmployeeRequestDTO;
import com.employeehub.dto.EmployeeResponseDTO;

// Service interface defining employee business operations.
// Separates business logic from controller layer.
public interface EmpService {

    // Create a new employee record
    EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto);

    // Retrieve paginated list of employees with sorting and filtering
    Page<EmployeeResponseDTO> readEmployees(int page, int size, String sortBy, String keyword, Double minSalary, Double maxSalary);

    // Delete employee by ID
    void deleteEmployee(Long id);

    // Update existing employee record
    EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto);

    // Retrieve single employee by ID
    EmployeeResponseDTO readEmployee(Long id);
}