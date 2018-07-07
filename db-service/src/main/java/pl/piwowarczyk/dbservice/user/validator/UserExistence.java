package pl.piwowarczyk.dbservice.user.validator;

import pl.piwowarczyk.dbservice.user.validator.impl.UserExistenceValidator;

import javax.validation.Constraint;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UserExistenceValidator.class)
public @interface UserExistence {
    String message() default "";
    Class<?>[] payload() default {};
    Class<?>[] groups() default {};
    
    boolean exists() default false;
    String property();
}
