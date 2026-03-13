package com.himanshu.ems.service;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.himanshu.ems.dto.EmployeeRequestDTO;
import com.himanshu.ems.dto.EmployeeResponseDTO;
import com.himanshu.ems.entity.EmpEntity;
import com.himanshu.ems.exception.ResourceNotFoundException;
import com.himanshu.ems.repository.EmpRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Objects;

// Service implementation containing employee business logic.
// Handles CRUD operations, validation, and DTO-Entity conversions.
@Slf4j
@Service
@RequiredArgsConstructor
public class EmpServiceImpl implements EmpService {

    private final EmpRepository empRepository;

    @Override
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {
        log.info("Creating new employee with email: {}", dto.getEmail());
        
        // Check for duplicate email
        if (empRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }
        
        // Convert DTO to Entity
        EmpEntity empEntity = new EmpEntity();
        BeanUtils.copyProperties(dto, empEntity);
        
        // Save to database
        EmpEntity savedEntity = empRepository.save(empEntity);
        log.info("Employee created with ID: {}", savedEntity.getEmployeeId());
        
        // Convert Entity to Response DTO
        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(savedEntity, responseDTO);
        return responseDTO;
    }

    @Override
    public EmployeeResponseDTO readEmployee(Long id) {
        log.info("Fetching employee with ID: {}", id);
        
        // Fetch employee or throw exception if not found
        EmpEntity empEntity = empRepository.findById(Objects.requireNonNull(id, "Employee ID cannot be null"))
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        
        // Convert Entity to Response DTO
        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(Objects.requireNonNull(empEntity, "Employee entity cannot be null"), responseDTO);
        return responseDTO;
    }

    @Override
    public Page<EmployeeResponseDTO> readEmployees(int page, int size, String sortBy) {
        log.info("Fetching employees page {} size {} sorting by {}", page, size, sortBy);
        
        // Create pageable object with sorting
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<EmpEntity> empPage = empRepository.findAll(pageable);
        
        // Map each entity to response DTO
        return empPage.map(empEntity -> {
            EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
            BeanUtils.copyProperties(Objects.requireNonNull(empEntity, "Employee entity cannot be null"), responseDTO);
            return responseDTO;
        });
    }

    @Override
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {
        log.info("Updating employee with ID: {}", id);
        
        // Fetch existing employee or throw exception
        EmpEntity existingEmployee = empRepository.findById(Objects.requireNonNull(id, "Employee ID cannot be null"))
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        
        // Check if new email conflicts with another employee's email
        if (!existingEmployee.getEmail().equals(dto.getEmail()) && empRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        // Update all fields
        existingEmployee.setFirstName(dto.getFirstName());
        existingEmployee.setLastName(dto.getLastName());
        existingEmployee.setEmail(dto.getEmail());
        existingEmployee.setPhoneNumber(dto.getPhoneNumber());
        existingEmployee.setSalary(dto.getSalary());
        existingEmployee.setDepartment(dto.getDepartment());
        existingEmployee.setDesignation(dto.getDesignation());

        // Save updated entity
        EmpEntity updatedEntity = empRepository.save(existingEmployee);
        
        // Convert to response DTO
        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(updatedEntity, responseDTO);
        log.info("Employee updated successfully with ID: {}", updatedEntity.getEmployeeId());
        return responseDTO;
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting employee with ID: {}", id);
        
        // Verify employee exists before deletion
        EmpEntity emp = empRepository.findById(Objects.requireNonNull(id, "Employee ID cannot be null"))
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        
        empRepository.delete(Objects.requireNonNull(emp, "Employee entity cannot be null"));
        log.info("Employee deleted successfully with ID: {}", id);
    }
}
