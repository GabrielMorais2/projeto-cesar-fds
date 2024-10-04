package com.cesar.school.domain.discipline.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisciplineRequest {

    @NotBlank(message = "O nome da disciplina é obrigatório.")
    private String name;

    @NotBlank(message = "O curso da disciplina é obrigatório.")
    private String course;

    @NotBlank(message = "O semestre da disciplina é obrigatório.")
    private String semester;
}
