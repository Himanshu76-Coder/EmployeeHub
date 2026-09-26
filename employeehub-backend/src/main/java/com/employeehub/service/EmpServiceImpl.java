package com.employeehub.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import com.employeehub.dto.EmployeeRequestDTO;
import com.employeehub.dto.EmployeeResponseDTO;
import com.employeehub.entity.EmpEntity;
import com.employeehub.exception.ResourceNotFoundException;
import com.employeehub.repository.EmpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;

// Service class that handles all employee business logic.
@Slf4j
@Service
@RequiredArgsConstructor
public class EmpServiceImpl implements EmpService {

    private final EmpRepository empRepository;

    // Allowed field names for sorting - prevents invalid sort field errors.
    private static final List<String> VALID_SORT_FIELDS = List.of(
        "employeeId", "firstName", "lastName", "email", "department", "designation", "salary"
    );

    @Override
    public EmployeeResponseDTO createEmployee(EmployeeRequestDTO dto) {
        log.info("Creating new employee with email: {}", dto.getEmail());

        if (empRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        EmpEntity empEntity = new EmpEntity();
        empEntity.setFirstName(dto.getFirstName());
        empEntity.setLastName(dto.getLastName());
        empEntity.setEmail(dto.getEmail());
        empEntity.setPhoneNumber(dto.getPhoneNumber());
        empEntity.setSalary(dto.getSalary());
        empEntity.setDepartment(dto.getDepartment());
        empEntity.setDesignation(dto.getDesignation());

        EmpEntity savedEntity = empRepository.save(empEntity);
        log.info("Employee created with ID: {}", savedEntity.getEmployeeId());

        return mapToResponseDTO(savedEntity);
    }

    @Override
    public EmployeeResponseDTO readEmployee(Long id) {
        log.info("Fetching employee with ID: {}", id);
        if (id == null) {
            throw new IllegalArgumentException("Employee ID must not be null");
        }

        EmpEntity empEntity = empRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        return mapToResponseDTO(empEntity);
    }

    @Override
    public Page<EmployeeResponseDTO> readEmployees(int page, int size, String sortBy, String keyword, Double minSalary, Double maxSalary) {
        log.info("Fetching employees - page: {}, size: {}, sortBy: {}, keyword: {}", page, size, sortBy, keyword);

        // Fall back to a safe default if the requested sort field is not valid.
        if (!VALID_SORT_FIELDS.contains(sortBy)) {
            sortBy = "employeeId";
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sortBy));
        
        Page<EmpEntity> empPage = empRepository.searchAndFilter(keyword, minSalary, maxSalary, pageable);

        return empPage.map(this::mapToResponseDTO);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(Long id, EmployeeRequestDTO dto) {
        log.info("Updating employee with ID: {}", id);
        if (id == null) {
            throw new IllegalArgumentException("Employee ID must not be null");
        }

        EmpEntity existingEmployee = empRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));

        // Only check for duplicate email if the email is being changed.
        if (!existingEmployee.getEmail().equals(dto.getEmail()) && empRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists.");
        }

        existingEmployee.setFirstName(dto.getFirstName());
        existingEmployee.setLastName(dto.getLastName());
        existingEmployee.setEmail(dto.getEmail());
        existingEmployee.setPhoneNumber(dto.getPhoneNumber());
        existingEmployee.setSalary(dto.getSalary());
        existingEmployee.setDepartment(dto.getDepartment());
        existingEmployee.setDesignation(dto.getDesignation());

        EmpEntity updatedEntity = empRepository.save(existingEmployee);
        log.info("Employee updated successfully with ID: {}", updatedEntity.getEmployeeId());

        return mapToResponseDTO(updatedEntity);
    }

    @Override
    public void deleteEmployee(Long id) {
        log.info("Deleting employee with ID: {}", id);
        if (id == null) {
            throw new IllegalArgumentException("Employee ID must not be null");
        }

        // Throw 404 if the employee does not exist before attempting deletion.
        if (!empRepository.existsById(id)) {
            throw new ResourceNotFoundException("Employee not found with ID: " + id);
        }

        empRepository.deleteById(id);
        log.info("Employee deleted successfully with ID: {}", id);
    }

    // Maps EmpEntity fields to EmployeeResponseDTO explicitly.
    // Avoids reflection and eliminates JDT null-safety unchecked conversion warnings.
    private EmployeeResponseDTO mapToResponseDTO(EmpEntity entity) {
        EmployeeResponseDTO dto = new EmployeeResponseDTO();
        dto.setEmployeeId(entity.getEmployeeId());
        dto.setFirstName(entity.getFirstName());
        dto.setLastName(entity.getLastName());
        dto.setEmail(entity.getEmail());
        dto.setPhoneNumber(entity.getPhoneNumber());
        dto.setSalary(entity.getSalary());
        dto.setDepartment(entity.getDepartment());
        dto.setDesignation(entity.getDesignation());
        return dto;
    }
}
