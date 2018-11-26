package pl.piwowarczyk.library.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class CustomValidationError {
    private String field;
    private String message;
    private Object rejectedValue;
}
