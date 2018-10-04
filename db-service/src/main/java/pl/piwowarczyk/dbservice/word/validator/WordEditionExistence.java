package pl.piwowarczyk.dbservice.word.validator;

import pl.piwowarczyk.dbservice.word.validator.impl.WordEditionExistenceValidator;

import javax.validation.Constraint;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({TYPE})
@Retention(RUNTIME)
@Documented
@Constraint(validatedBy = WordEditionExistenceValidator.class)
public @interface WordEditionExistence {
    
    String field();
    
    String message() default "";
    Class<?>[] groups() default {};
    Class<?>[] payload() default {};

    @Target({TYPE})
    @Retention(RUNTIME)
    @Documented
    @interface List {
        WordEditionExistence[] value();
    }
}
