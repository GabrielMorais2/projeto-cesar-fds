package com.cesar.school.domain.discipline.payload;

import com.cesar.school.domain.group.payload.GroupWithStudentsDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisciplineWithGroupDTO {
    private Long id;
    private String name;
    private String course;
    private String semester;
    private List<GroupWithStudentsDTO> groups;
}
