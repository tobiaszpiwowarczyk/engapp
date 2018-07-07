package pl.piwowarczyk.dbservice.user.validator.impl;

import pl.piwowarczyk.dbservice.user.validator.CorrectName;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectNameValidator implements ConstraintValidator<CorrectName, String> {
    
    private static final String NAME_REGEX = "^[A-Z][a-ząćęłńóśźż]+$";
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches(NAME_REGEX);
    }
}
