package pl.piwowarczyk.library.util;

import org.springframework.context.MessageSource;
import org.springframework.web.bind.MethodArgumentNotValidException;
import pl.piwowarczyk.library.model.CustomValidationErrors;
import pl.piwowarczyk.library.model.CustomValidationFieldError;
import pl.piwowarczyk.library.model.CustomValidationObjectError;

import javax.validation.ConstraintViolationException;
import java.util.Locale;
import java.util.stream.Collectors;

public class ExceptionHandlerUtils {
        
    public static CustomValidationErrors handleMethodArgumentNotValidException(MethodArgumentNotValidException e, MessageSource messageSource) {
        return new CustomValidationErrors(
                e.getBindingResult().getFieldErrors()
                .stream().map(x -> new CustomValidationObjectError(x.getField(), messageSource.getMessage(x, Locale.getDefault()), x.getRejectedValue()))
                .collect(Collectors.toList())
        );
    }
    
    public static CustomValidationErrors handleConstraintViolationException(ConstraintViolationException e, MessageSource messageSource) {
        return new CustomValidationErrors(
                e.getConstraintViolations()
                        .stream().map(x -> new CustomValidationFieldError(messageSource.getMessage(x.getPropertyPath().toString(), null, Locale.getDefault())))
                        .collect(Collectors.toList())
        );
    }
    
}
