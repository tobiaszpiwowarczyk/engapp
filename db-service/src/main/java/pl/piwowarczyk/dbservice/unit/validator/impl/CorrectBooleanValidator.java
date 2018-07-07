package pl.piwowarczyk.dbservice.unit.validator.impl;

import pl.piwowarczyk.dbservice.unit.validator.CorrectBoolean;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectBooleanValidator implements ConstraintValidator<CorrectBoolean, Boolean> {
    
    private static final String BOOLEAN_REGEX = "^(true|false)$";
    
    @Override
    public boolean isValid(Boolean value, ConstraintValidatorContext context) {
        return value.toString().matches(BOOLEAN_REGEX);
    }
}
