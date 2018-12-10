package pl.piwowarczyk.library.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CustomValidationErrors {
    
    private List<CustomValidationError> errors;
    
}
