package com.cesar.school.domain.user.groups.dto;


import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupRequestDTO {

    @NotEmpty
    private String name;
    @NotEmpty
    private String email;
}
