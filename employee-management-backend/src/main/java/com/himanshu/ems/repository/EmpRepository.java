package com.himanshu.ems.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.himanshu.ems.entity.EmpEntity;

import java.util.Optional;

// Repository interface for Employee database operations.
// Provides CRUD operations and custom query methods via Spring Data JPA.
@Repository
public interface EmpRepository extends JpaRepository<EmpEntity, Long> {
    
    // Check if email already exists (for duplicate validation)
    boolean existsByEmail(String email);
    
    // Find employee by email address
    Optional<EmpEntity> findByEmail(String email);
}
