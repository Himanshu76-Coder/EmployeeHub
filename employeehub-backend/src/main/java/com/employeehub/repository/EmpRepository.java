package com.employeehub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.employeehub.entity.EmpEntity;

// Repository for employee database operations.
// Spring Data JPA automatically provides all standard CRUD methods.
public interface EmpRepository extends JpaRepository<EmpEntity, Long> {

    // Returns true if an employee with the given email already exists.
    boolean existsByEmail(String email);
}
