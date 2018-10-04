package pl.piwowarczyk.dbservice.word.validator;

import pl.piwowarczyk.dbservice.word.validator.impl.WordCreationExistenceValidator;

import javax.validation.Constraint;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.TYPE;

@Retention(RetentionPolicy.RUNTIME)
@Target({ TYPE, ANNOTATION_TYPE })
@Constraint(validatedBy = WordCreationExistenceValidator.class)
@Documented
public @interface WordCreationExistence {
    
    boolean exists() default true;
    String field() default "";
    
    String message() default "";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};


    @Target({ TYPE, ANNOTATION_TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    @interface List {
        WordCreationExistence[] value() default {};
    }
}
