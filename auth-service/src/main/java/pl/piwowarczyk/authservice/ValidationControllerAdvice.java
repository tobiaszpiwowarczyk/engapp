package pl.piwowarczyk.authservice;

import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.piwowarczyk.library.model.CustomValidationErrors;

import javax.validation.ConstraintViolationException;

import static pl.piwowarczyk.library.util.ExceptionHandlerUtils.handleConstraintViolationException;
import static pl.piwowarczyk.library.util.ExceptionHandlerUtils.handleMethodArgumentNotValidException;

@RestControllerAdvice
@AllArgsConstructor
public class ValidationControllerAdvice {

    private MessageSource messageSource;


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    public CustomValidationErrors handleValidationError(MethodArgumentNotValidException e) {
        return handleMethodArgumentNotValidException(e, messageSource);
    }


    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomValidationErrors handleConsraintViolationException(ConstraintViolationException e) {
        return handleConstraintViolationException(e, messageSource);
    }
}
