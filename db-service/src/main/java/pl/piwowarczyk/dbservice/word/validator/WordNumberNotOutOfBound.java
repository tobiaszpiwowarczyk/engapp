package pl.piwowarczyk.dbservice.word.validator;

import pl.piwowarczyk.dbservice.word.validator.impl.WordNumberNotOutOfBoundValidator;

import javax.validation.Constraint;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;

@Target(TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(validatedBy = WordNumberNotOutOfBoundValidator.class)
public @interface WordNumberNotOutOfBound {
    String message() default "";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};
}
