package com.cesar.school.domain.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface StudentRepository  extends JpaRepository<Student, Long> {
    Set<Student> findAllByIdIn (Set<Long> ids);

}
