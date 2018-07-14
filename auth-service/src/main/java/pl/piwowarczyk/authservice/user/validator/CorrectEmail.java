package pl.piwowarczyk.authservice.user.validator;

import pl.piwowarczyk.authservice.user.validator.impl.CorrectEmailValidator;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectEmailValidator.class)
public @interface CorrectEmail {
    String message() default "";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};
}
