package com.cesar.school.domain.evaluation.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EvaluationRequest {

    @NotBlank(message = "O nome da avaliação é obrigatório.")
    private String name;

    @NotBlank(message = "A disciplina é obrigatória.")
    private long disciplineId;

    @NotBlank(message = "O grupo é obrigatório.")
    private long groupId;

    @NotNull(message = "A data limite é obrigatória.")
    private LocalDate deadline;

    private String userId;
}
