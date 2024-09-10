package com.cesar.school.domain.user.groups.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupResponseDTO {
    private String id;
    private String name;
    private String email;
}
