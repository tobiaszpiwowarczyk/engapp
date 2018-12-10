package pl.piwowarczyk.library.util;

import org.springframework.context.MessageSource;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import pl.piwowarczyk.library.model.CustomValidationError;
import pl.piwowarczyk.library.model.CustomValidationErrors;

import javax.validation.ConstraintViolationException;
import java.util.Locale;
import java.util.stream.Collectors;

public class ExceptionHandlerUtils {
        
    public static CustomValidationErrors handleMethodArgumentNotValidException(MethodArgumentNotValidException e, MessageSource messageSource) {
        return ExceptionHandlerUtils.handleMethodArgumentNotValidException(e.getBindingResult(), messageSource);
    }
    
    public static CustomValidationErrors handleMethodArgumentNotValidException(BindingResult bindingResult, MessageSource messageSource) {
        return new CustomValidationErrors(
                bindingResult.getFieldErrors()
                        .stream().map(x -> new CustomValidationError(x.getField(), messageSource.getMessage(x, Locale.getDefault()), x.getRejectedValue()))
                        .collect(Collectors.toList())
        );
    }
    
    public static CustomValidationErrors handleConstraintViolationException(ConstraintViolationException e, MessageSource messageSource) {
        return new CustomValidationErrors(
                e.getConstraintViolations()
                        .stream().map(x -> 
                            CustomValidationError.builder()
                                .message(messageSource.getMessage(x.getPropertyPath().toString(), null, Locale.getDefault()))
                            .build()
                        )
                        .collect(Collectors.toList())
        );
    }
    
}
