package pl.piwowarczyk.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CustomValidationFieldError implements CustomValidationError {
    private String message;
}
