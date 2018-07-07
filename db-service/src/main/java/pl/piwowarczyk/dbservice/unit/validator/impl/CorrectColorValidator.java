package pl.piwowarczyk.dbservice.unit.validator.impl;

import pl.piwowarczyk.dbservice.unit.validator.CorrectColor;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectColorValidator implements ConstraintValidator<CorrectColor, String> {
    
    private static final String COLOR_REGEX = "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$"; 
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches(COLOR_REGEX);
    }
}
