package pl.piwowarczyk.dbservice.validator.impl;

import pl.piwowarczyk.dbservice.validator.CorrectId;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectIdValidator implements ConstraintValidator<CorrectId, String> {
    
    private static final String ID_REGEX = "^[0-9a-fA-F]{24}$";
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches(ID_REGEX);
    }
}
