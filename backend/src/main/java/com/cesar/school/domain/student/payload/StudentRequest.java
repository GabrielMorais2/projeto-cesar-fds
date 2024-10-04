package com.cesar.school.domain.student.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentRequest {
    private String name;
    private String email;
}