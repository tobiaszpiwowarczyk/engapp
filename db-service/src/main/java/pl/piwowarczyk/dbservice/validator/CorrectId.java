package pl.piwowarczyk.dbservice.validator;

import pl.piwowarczyk.dbservice.validator.impl.CorrectIdValidator;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;

@Target({FIELD, PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectIdValidator.class)
public @interface CorrectId {
    String message() default "";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};
}
