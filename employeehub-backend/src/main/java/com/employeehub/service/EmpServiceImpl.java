package com.employeehub.service;

import org.springframework.beans.BeanUtils;
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
        BeanUtils.copyProperties(dto, empEntity);

        EmpEntity savedEntity = empRepository.save(empEntity);
        log.info("Employee created with ID: {}", savedEntity.getEmployeeId());

        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(savedEntity, responseDTO);
        return responseDTO;
    }

    @Override
    public EmployeeResponseDTO readEmployee(Long id) {
        log.info("Fetching employee with ID: {}", id);
        if (id == null) {
            throw new IllegalArgumentException("Employee ID must not be null");
        }

        EmpEntity empEntity = empRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + id));
        if (empEntity == null) {
            throw new IllegalStateException("Employee entity must not be null");
        }

        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(empEntity, responseDTO);
        return responseDTO;
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

        return empPage.map(empEntity -> {
            if (empEntity == null) {
                throw new IllegalStateException("Employee entity must not be null");
            }
            EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
            BeanUtils.copyProperties(empEntity, responseDTO);
            return responseDTO;
        });
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

        EmployeeResponseDTO responseDTO = new EmployeeResponseDTO();
        BeanUtils.copyProperties(updatedEntity, responseDTO);
        return responseDTO;
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
}
