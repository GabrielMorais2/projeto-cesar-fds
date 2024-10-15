package com.cesar.school.domain.group.payload;

import com.cesar.school.domain.student.payload.StudentDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GroupWithStudentsDTO {

    private Long id;
    private String name;
    private List<StudentDTO> students;
}
