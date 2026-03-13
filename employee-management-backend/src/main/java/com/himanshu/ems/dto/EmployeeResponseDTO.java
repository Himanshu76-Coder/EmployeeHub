package com.himanshu.ems.dto;

import lombok.Data;

// DTO for outgoing employee data responses.
// Excludes sensitive fields like timestamps from API responses.
@Data
public class EmployeeResponseDTO {
    
    private Long employeeId;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String designation;
    private Double salary;
    private String phoneNumber;
}
