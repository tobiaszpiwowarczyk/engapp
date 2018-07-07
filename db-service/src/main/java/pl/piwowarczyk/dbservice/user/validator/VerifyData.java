package pl.piwowarczyk.dbservice.user.validator;

import pl.piwowarczyk.dbservice.user.validator.impl.VerifyDataValidator;

import javax.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = VerifyDataValidator.class)
public @interface VerifyData {
    String message() default "";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};
}
