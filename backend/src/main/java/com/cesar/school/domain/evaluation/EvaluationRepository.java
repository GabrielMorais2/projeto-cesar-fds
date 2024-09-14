package com.cesar.school.domain.evaluation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EvaluationRepository extends JpaRepository<Evaluation, Long> {

    Optional<Evaluation> findByIdAndUserId(Long id, String userId);
    @Query("SELECT e FROM Evaluation e " +
            "JOIN FETCH e.discipline c " +
            "JOIN FETCH e.group g " +
            "JOIN FETCH g.students s " +
            "WHERE e.user.id = :userId")
    List<Evaluation> findAllByUserId(String userId);
}