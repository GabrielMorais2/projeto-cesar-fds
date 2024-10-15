package com.cesar.school.domain.evaluation.payload;

import com.cesar.school.domain.discipline.payload.DisciplineDTO;
import com.cesar.school.domain.group.payload.GroupDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EvaluationResponse {

    private Long id;
    private String name;
    private LocalDate deadline;
    private GroupDTO group;
    private DisciplineDTO discipline;
    private boolean isSent;

}