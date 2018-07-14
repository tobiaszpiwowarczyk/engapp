package pl.piwowarczyk.authservice.user.validator.impl;

import pl.piwowarczyk.authservice.user.validator.CorrectEmail;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectEmailValidator implements ConstraintValidator<CorrectEmail, String> {
    
    private static final String EMAIL_REGEX = "^[a-zA-Z0-9.\\-_]+@+[a-z]+\\.+[a-z]+(?:\\.[a-z]{2,}+)*$";
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches(EMAIL_REGEX);
    }
}
