package pl.piwowarczyk.dbservice.unit.validator.impl;

import pl.piwowarczyk.dbservice.unit.validator.CorrectUnitName;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CorrectUnitNameValidator implements ConstraintValidator<CorrectUnitName, String> {
    
    private static final String UNIT_NAME_REGEX = "^[A-Z][a-ząęćżźńłóś\\s]+$";
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return value.matches(UNIT_NAME_REGEX);
    }
}
