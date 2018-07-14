package pl.piwowarczyk.authservice.validator;

import pl.piwowarczyk.authservice.validator.impl.PasswordStrengthValidator;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordStrengthValidator.class)
public @interface PasswordStrength {
    String message() default "";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};
}
