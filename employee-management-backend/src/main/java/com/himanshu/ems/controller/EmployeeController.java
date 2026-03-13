package com.himanshu.ems.controller;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.himanshu.ems.dto.ApiResponse;
import com.himanshu.ems.dto.EmployeeRequestDTO;
import com.himanshu.ems.dto.EmployeeResponseDTO;
import com.himanshu.ems.service.EmpService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import io.swagger.v3.oas.annotations.tags.Tag;

// REST Controller for employee management operations.
// Exposes endpoints for CRUD operations with standardized API responses.
@RestController
@RequestMapping("/api/v1/employees")
@RequiredArgsConstructor
@Tag(name = "Employee API", description = "CRUD Operations for Employees")
public class EmployeeController {
    
    private final EmpService empService;

    // GET /api/v1/employees - Retrieve paginated list of employees
    @GetMapping
    public ResponseEntity<ApiResponse<Page<EmployeeResponseDTO>>> getAllEmployees(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "employeeId") String sortBy) {
        Page<EmployeeResponseDTO> employees = empService.readEmployees(page, size, sortBy);
        return ResponseEntity.ok(new ApiResponse<>(true, "Employees fetched successfully", employees));
    }
    
    // GET /api/v1/employees/{id} - Retrieve single employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> getEmployeeById(@PathVariable Long id) {
        EmployeeResponseDTO employee = empService.readEmployee(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Employee fetched successfully", employee));
    }

    // POST /api/v1/employees - Create new employee
    @PostMapping
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> createEmployee(@Valid @RequestBody EmployeeRequestDTO employee) {
        EmployeeResponseDTO createdEmployee = empService.createEmployee(employee);
        return new ResponseEntity<>(new ApiResponse<>(true, "Employee created successfully", createdEmployee), HttpStatus.CREATED);
    }
    
    // PUT /api/v1/employees/{id} - Update existing employee
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<EmployeeResponseDTO>> updateEmployee(
            @PathVariable Long id, @Valid @RequestBody EmployeeRequestDTO employee) {
        EmployeeResponseDTO updatedEmployee = empService.updateEmployee(id, employee);
        return ResponseEntity.ok(new ApiResponse<>(true, "Employee updated successfully", updatedEmployee));
    }

    // DELETE /api/v1/employees/{id} - Delete employee by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteEmployee(@PathVariable Long id) {
        empService.deleteEmployee(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Employee deleted successfully", null));
    }
}
