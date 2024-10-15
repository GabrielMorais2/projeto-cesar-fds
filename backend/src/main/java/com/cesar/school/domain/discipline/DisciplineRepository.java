package com.cesar.school.domain.discipline;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface DisciplineRepository extends JpaRepository<Discipline, Long> {
    Optional<Discipline> findByIdAndUserId(Long id, String userId);
    @Query("SELECT d FROM Discipline d LEFT JOIN FETCH d.groups WHERE d.user.id = :userId")
    List<Discipline> findAllWithGroupsByUserId(@Param("userId") String userId);

}