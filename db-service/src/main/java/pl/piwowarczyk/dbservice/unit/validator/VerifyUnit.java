package pl.piwowarczyk.dbservice.unit.validator;

import pl.piwowarczyk.dbservice.unit.validator.impl.VerifyUnitValidator;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = VerifyUnitValidator.class)
public @interface VerifyUnit {
    String message() default "";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};
}
