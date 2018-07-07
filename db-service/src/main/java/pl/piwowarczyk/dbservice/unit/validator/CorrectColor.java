package pl.piwowarczyk.dbservice.unit.validator;

import pl.piwowarczyk.dbservice.unit.validator.impl.CorrectColorValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectColorValidator.class)
public @interface CorrectColor {
    String message() default "{CorrectColor.color}";
    Class<? extends Payload>[] payload() default {};
    Class<?>[] groups() default {};
}
