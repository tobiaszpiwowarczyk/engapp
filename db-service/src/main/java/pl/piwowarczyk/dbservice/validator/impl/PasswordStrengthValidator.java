package pl.piwowarczyk.dbservice.validator.impl;

import pl.piwowarczyk.dbservice.util.PasswordStrengthUtil;
import pl.piwowarczyk.dbservice.validator.PasswordStrength;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class PasswordStrengthValidator implements ConstraintValidator<PasswordStrength, String> {
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return PasswordStrengthUtil.getPasswordStrength(value) >= 4;
    }
}
