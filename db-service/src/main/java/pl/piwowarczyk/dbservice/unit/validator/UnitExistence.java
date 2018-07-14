package pl.piwowarczyk.dbservice.unit.validator;

import pl.piwowarczyk.dbservice.unit.validator.impl.UnitExistenceValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.ReportAsSingleViolation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;

@Target({FIELD, PARAMETER, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UnitExistenceValidator.class)
@ReportAsSingleViolation
public @interface UnitExistence {
    String message() default "";
    Class<? extends Payload>[] payload() default {};
    Class<?>[] groups() default {};
    
    boolean exists() default false;
    String property();
}
