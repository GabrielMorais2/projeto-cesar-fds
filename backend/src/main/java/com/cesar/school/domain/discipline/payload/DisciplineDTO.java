package com.cesar.school.domain.discipline.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DisciplineDTO {
    private Long id;
    private String name;
    private String semester;
}
