package pl.piwowarczyk.dbservice.user.validator;

import pl.piwowarczyk.dbservice.user.validator.impl.CorrectNameValidator;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectNameValidator.class)
public @interface CorrectName {
    String message() default "";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};
}
