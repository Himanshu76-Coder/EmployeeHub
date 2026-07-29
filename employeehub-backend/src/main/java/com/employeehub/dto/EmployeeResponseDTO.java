package com.employeehub.dto;

import lombok.Data;

// DTO for outgoing employee data. Excludes internal audit fields (createdAt, updatedAt).
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
