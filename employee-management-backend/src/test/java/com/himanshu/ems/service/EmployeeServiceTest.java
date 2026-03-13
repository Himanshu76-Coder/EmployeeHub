package com.himanshu.ems.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.Objects;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.himanshu.ems.dto.EmployeeRequestDTO;
import com.himanshu.ems.dto.EmployeeResponseDTO;
import com.himanshu.ems.entity.EmpEntity;
import com.himanshu.ems.exception.ResourceNotFoundException;
import com.himanshu.ems.repository.EmpRepository;


// Unit tests for EmpServiceImpl using Mockito.
// Tests CRUD operations and exception handling.
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

    @SuppressWarnings("null")
    @Test
    void createEmployee_ShouldReturnResponseDTO() {
        when(empRepository.existsByEmail(anyString())).thenReturn(false);
        when(empRepository.save(any(EmpEntity.class))).thenReturn(entity);

        EmployeeResponseDTO response = empService.createEmployee(requestDTO);

        assertNotNull(response);
        assertEquals("John", Objects.requireNonNull(response).getFirstName());
        assertEquals("john.doe@example.com", response.getEmail());
        verify(empRepository, times(1)).save(any(EmpEntity.class));
    }

    @SuppressWarnings("null")
    @Test
    void createEmployee_DuplicateEmail_ShouldThrowException() {
        when(empRepository.existsByEmail(anyString())).thenReturn(true);

        assertThrows(IllegalArgumentException.class, () -> empService.createEmployee(requestDTO));
        verify(empRepository, never()).save(any());
    }

    @Test
    void getEmployeeById_NotFound_ShouldThrowException() {
        when(empRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> empService.readEmployee(1L));
    }

    @SuppressWarnings("null")
    @Test
    void deleteEmployee_ShouldDeleteSuccessfully() {
        when(empRepository.findById(1L)).thenReturn(Optional.of(entity));
        doNothing().when(empRepository).delete(entity);

        assertDoesNotThrow(() -> empService.deleteEmployee(1L));
        verify(empRepository, times(1)).delete(entity);
    }
}
