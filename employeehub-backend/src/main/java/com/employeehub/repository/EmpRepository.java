package com.employeehub.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.employeehub.entity.EmpEntity;

// Repository for employee database operations.
// Spring Data JPA automatically provides all standard CRUD methods.
public interface EmpRepository extends JpaRepository<EmpEntity, Long> {

    // Returns true if an employee with the given email already exists.
    boolean existsByEmail(String email);

    // Dynamic search and filter query
    @Query("SELECT e FROM EmpEntity e WHERE " +
           "(:keyword IS NULL OR LOWER(e.firstName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.lastName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR LOWER(e.email) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
           "AND (:minSalary IS NULL OR e.salary >= :minSalary) " +
           "AND (:maxSalary IS NULL OR e.salary <= :maxSalary)")
    Page<EmpEntity> searchAndFilter(
            @Param("keyword") String keyword,
            @Param("minSalary") Double minSalary,
            @Param("maxSalary") Double maxSalary,
            Pageable pageable);
}
