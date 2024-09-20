package com.cesar.school.domain.group.payload;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupRequestDTO {
    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotNull
    private Long disciplineId;

    @NotNull
    private Set<Long> studentIds;
}
