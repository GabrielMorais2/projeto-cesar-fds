package com.cesar.school.domain.discipline;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    
}