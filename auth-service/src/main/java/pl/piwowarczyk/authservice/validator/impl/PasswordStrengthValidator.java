package pl.piwowarczyk.authservice.validator.impl;

import pl.piwowarczyk.authservice.crypto.PasswordStrengthUtil;
import pl.piwowarczyk.authservice.validator.PasswordStrength;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;


public class PasswordStrengthValidator implements ConstraintValidator<PasswordStrength, String> {
    
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return PasswordStrengthUtil.getPasswordStrength(value) >= 4;
    }
}
