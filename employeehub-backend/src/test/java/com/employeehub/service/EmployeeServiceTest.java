package com.employeehub.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import java.util.Optional;
import org.springframework.lang.NonNull;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import com.employeehub.dto.EmployeeRequestDTO;
import com.employeehub.dto.EmployeeResponseDTO;
import com.employeehub.entity.EmpEntity;
import com.employeehub.exception.ResourceNotFoundException;
import com.employeehub.repository.EmpRepository;

// Unit tests for EmpServiceImpl using Mockito.
@ExtendWith(MockitoExtension.class)
public class EmployeeServiceTest {

    @Mock
    private EmpRepository empRepository;

    @InjectMocks
    private EmpServiceImpl empService;

    private EmployeeRequestDTO requestDTO;
    private EmpEntity entity;

    @BeforeEach
    void setUp() {
        requestDTO = new EmployeeRequestDTO();
        requestDTO.setFirstName("John");
        requestDTO.setLastName("Doe");
        requestDTO.setEmail("john.doe@example.com");
        requestDTO.setDepartment("IT");
        requestDTO.setDesignation("Developer");
        requestDTO.setSalary(75000.0);
        requestDTO.setPhoneNumber("1234567890");

        entity = new EmpEntity();
        entity.setEmployeeId(1L);
        entity.setFirstName("John");
        entity.setLastName("Doe");
        entity.setEmail("john.doe@example.com");
        entity.setDepartment("IT");
        entity.setDesignation("Developer");
        entity.setSalary(75000.0);
        entity.setPhoneNumber("1234567890");
    }

    // Helper to bypass IDE null-safety warnings on Mockito matchers for @NonNull arguments.
    // Registers the Mockito matcher but returns a non-null instance to satisfy the compiler.
    @NonNull
    private EmpEntity anyEmpEntity() {
        any(EmpEntity.class);
        return new EmpEntity();
    }

    @Test
    void createEmployee_ShouldReturnResponseDTO() {
        when(empRepository.existsByEmail(anyString())).thenReturn(false);
        when(empRepository.save(anyEmpEntity())).thenReturn(entity);

        EmployeeResponseDTO response = empService.createEmployee(requestDTO);

        assertNotNull(response);
        assertEquals("John", response.getFirstName());
        assertEquals("john.doe@example.com", response.getEmail());
        verify(empRepository, times(1)).save(anyEmpEntity());
    }

    @Test
    void createEmployee_DuplicateEmail_ShouldThrowException() {
        when(empRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> empService.createEmployee(requestDTO));
        verify(empRepository, never()).save(anyEmpEntity());
    }

    @Test
    void getEmployeeById_NotFound_ShouldThrowException() {
        when(empRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> empService.readEmployee(1L));
    }

    @Test
    void deleteEmployee_ShouldDeleteSuccessfully() {
        when(empRepository.existsById(1L)).thenReturn(true);
        doNothing().when(empRepository).deleteById(1L);

        assertDoesNotThrow(() -> empService.deleteEmployee(1L));
        verify(empRepository, times(1)).deleteById(1L);
    }
}
