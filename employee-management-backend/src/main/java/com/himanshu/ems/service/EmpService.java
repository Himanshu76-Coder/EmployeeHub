package com.himanshu.ems.service;

import org.springframework.data.domain.Page;

import com.himanshu.ems.dto.EmployeeRequestDTO;
import com.himanshu.ems.dto.EmployeeResponseDTO;

// Service interface defining employee business operations.
// Separates business logic from controller layer.
public interface EmpService {

    // Create a new employee record
    EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto);

    // Retrieve paginated list of employees with sorting
    Page<EmployeeResponseDTO> readEmployees(int page, int size, String sortBy);

    // Delete employee by ID
    void deleteEmployee(Long id);

    // Update existing employee record
    EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto);

    // Retrieve single employee by ID
    EmployeeResponseDTO readEmployee(Long id);
}