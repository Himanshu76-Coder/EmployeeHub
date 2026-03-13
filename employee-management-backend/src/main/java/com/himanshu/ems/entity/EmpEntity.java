package com.himanshu.ems.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.time.LocalDateTime;

// JPA Entity representing an Employee in the database.
// Mapped to 'employees' table with auto-generated timestamps.
@Data
@Entity
@Table(name = "employees")
public class EmpEntity {
    
    // Primary key with auto-increment
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long employeeId;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    // Unique constraint ensures no duplicate emails
    @Column(unique = true, nullable = false)
    private String email;

    private String phoneNumber;

    private Double salary;
    
    @Column(nullable = false)
    private String department;

    @Column(nullable = false)
    private String designation;

    // Automatically set on record creation
    @CreationTimestamp
    private LocalDateTime createdAt;

    // Automatically updated on record modification
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
