package pl.piwowarczyk.dbservice.validator;

import pl.piwowarczyk.dbservice.validator.impl.CorrectIdValidator;

import javax.validation.Constraint;
import javax.validation.ReportAsSingleViolation;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.PARAMETER;

@Target({FIELD, PARAMETER, ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = CorrectIdValidator.class)
@ReportAsSingleViolation
public @interface CorrectId {
    String message() default "{engapp.messages.incorrect.id}";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};
}
