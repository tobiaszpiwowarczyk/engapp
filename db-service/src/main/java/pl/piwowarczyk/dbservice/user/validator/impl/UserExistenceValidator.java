package pl.piwowarczyk.dbservice.user.validator.impl;

import pl.piwowarczyk.dbservice.user.repository.UserRepository;
import pl.piwowarczyk.dbservice.user.validator.UserExistence;

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
        return userRepository.existsBy(userExistence.property(), value, "users") == userExistence.exists();
    }
}
