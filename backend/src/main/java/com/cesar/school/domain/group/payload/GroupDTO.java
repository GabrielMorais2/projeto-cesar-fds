package com.cesar.school.domain.group.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupDTO {
    private Long id;
    private String name;
    private Long disciplineId;

    public GroupDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }
}
