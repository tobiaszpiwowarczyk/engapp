package pl.piwowarczyk.dbservice.user.validator.impl;

import lombok.AllArgsConstructor;
import pl.piwowarczyk.dbservice.user.User;
import pl.piwowarczyk.dbservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.dbservice.user.repository.UserRepository;
import pl.piwowarczyk.dbservice.user.validator.VerifyData;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@AllArgsConstructor
public class VerifyDataValidator implements ConstraintValidator<VerifyData, UserEditionEntity> {

    private UserRepository userRepository;


    @Override
    public boolean isValid(UserEditionEntity user, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();
        User userFound = userRepository.findById(user.getId()).get();
        
        if(user.getUsername().equals(userFound.getUsername()) && user.getEmail().equals(userFound.getEmail()))
            return true;
        
        if(!user.getUsername().equals(userFound.getUsername()) && userRepository.existsBy("username", user.getUsername(), "users"))
            context.buildConstraintViolationWithTemplate("{UserExistence.username}")
                .addPropertyNode("username").addConstraintViolation();
            
        if(!user.getEmail().equals(userFound.getEmail()) && userRepository.existsBy("email", user.getEmail(), "users"))
            context.buildConstraintViolationWithTemplate("{UserExistence.email}")
                .addPropertyNode("email").addConstraintViolation();

        return !userRepository.existsBy("username", user.getUsername(), "users") ||
               !userRepository.existsBy("email", user.getEmail(), "users");

    }
}
