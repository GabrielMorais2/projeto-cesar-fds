package com.cesar.school.domain.group.payload;

import com.cesar.school.domain.student.payload.StudentRequest;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GroupRequest {
    private String name;
    private Long disciplineId;
    private List<StudentRequest> students;
}
