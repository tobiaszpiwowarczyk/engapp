package pl.piwowarczyk.library.util;

import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import pl.piwowarczyk.library.model.CustomValidationError;

import java.util.List;
import java.util.stream.Collectors;

public class ValidationService {
    
    public ResponseEntity<List<CustomValidationError>> validate(BindingResult bindingResult, MessageSource messageSource, String field) {
        List<CustomValidationError> errors = ExceptionHandlerUtils.handleMethodArgumentNotValidException(bindingResult, messageSource).getErrors();
        
        if(!field.equals("")) 
            errors = errors.stream().filter(err -> err.getField().equals(field))
                    .collect(Collectors.toList());
        
        return errors.size() == 0 ?
                ResponseEntity.ok(errors) :
                new ResponseEntity<>(errors, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    
}
