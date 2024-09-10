package com.IT4409.backend.repositories;

import com.IT4409.backend.entities.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerDetailRepository extends JpaRepository<UserDetail, Long> {
}
