package pl.piwowarczyk.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomValidationObjectError implements CustomValidationError {
    private String field;
    private String message;
    private Object rejectedValue;
}