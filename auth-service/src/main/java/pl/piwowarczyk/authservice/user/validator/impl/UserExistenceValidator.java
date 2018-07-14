package pl.piwowarczyk.authservice.user.validator.impl;

import org.bson.types.ObjectId;
import pl.piwowarczyk.authservice.user.repository.UserRepository;
import pl.piwowarczyk.authservice.user.validator.UserExistence;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UserExistenceValidator implements ConstraintValidator<UserExistence, String> {
    
    private UserRepository userRepository;
    private UserExistence userExistence;

    public UserExistenceValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public void initialize(UserExistence constraintAnnotation) {
        this.userExistence = constraintAnnotation;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return userRepository.existsBy(userExistence.property(), userExistence.property().equals("_id") ? new ObjectId(value) : value) == userExistence.exists();
    }
}
