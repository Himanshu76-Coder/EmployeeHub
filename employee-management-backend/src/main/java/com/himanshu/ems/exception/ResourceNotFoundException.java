package com.himanshu.ems.exception;

// Custom exception thrown when a requested resource is not found.
// Results in HTTP 404 response via GlobalExceptionHandler.
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
