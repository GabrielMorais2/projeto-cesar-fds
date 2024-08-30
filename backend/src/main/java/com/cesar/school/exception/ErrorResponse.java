package com.cesar.school.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ErrorResponse {

    private Integer statusCode;
    private LocalDateTime timestamp;
    private String message;

}
