package pl.piwowarczyk.dbservice.validator;

import org.springframework.context.MessageSource;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.piwowarczyk.dbservice.validator.model.CustomValidationErrors;
import pl.piwowarczyk.dbservice.validator.model.CustomValidationFieldError;
import pl.piwowarczyk.dbservice.validator.model.CustomValidationObjectError;

import javax.validation.ConstraintViolationException;
import java.util.Locale;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ValidationControllerAdvice {
    
    private MessageSource messageSource;

    public ValidationControllerAdvice(MessageSource messageSource) {
        this.messageSource = messageSource;
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public CustomValidationErrors handleValidationError(MethodArgumentNotValidException e) {
        return new CustomValidationErrors(
                e.getBindingResult().getFieldErrors()
                    .stream().map(x -> new CustomValidationObjectError(x.getField(), messageSource.getMessage(x, Locale.getDefault()), x.getRejectedValue()))
                    .collect(Collectors.toList())
        );
        
    }
    
    
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomValidationErrors handleConsraintViolationException(ConstraintViolationException e) {
        return new CustomValidationErrors(
                e.getConstraintViolations()
                .stream().map(x -> new CustomValidationFieldError(x.getMessage()))
                .collect(Collectors.toList())
        );
    }
}
