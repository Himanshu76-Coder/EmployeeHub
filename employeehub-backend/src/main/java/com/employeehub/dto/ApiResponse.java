package com.employeehub.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Generic wrapper for standardized API responses.
// Ensures consistent response structure across all endpoints.
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;  // Indicates if operation was successful
    private String message;   // Human-readable message
    private T data;           // Generic payload (can be any type)
}
