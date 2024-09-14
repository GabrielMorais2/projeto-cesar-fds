package com.cesar.school.domain.group;

import com.cesar.school.domain.evaluation.Evaluation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

    List<Group> findAllByUserId(String userId);
}