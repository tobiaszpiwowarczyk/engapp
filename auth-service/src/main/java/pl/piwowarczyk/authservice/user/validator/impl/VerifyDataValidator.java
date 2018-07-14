package pl.piwowarczyk.authservice.user.validator.impl;

import lombok.AllArgsConstructor;
import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.authservice.user.repository.UserRepository;
import pl.piwowarczyk.authservice.user.validator.VerifyData;

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
        
        if(!user.getUsername().equals(userFound.getUsername()) && userRepository.existsBy("username", user.getUsername()))
            context.buildConstraintViolationWithTemplate("{UserExistence.username}")
                .addPropertyNode("username").addConstraintViolation();
            
        if(!user.getEmail().equals(userFound.getEmail()) && userRepository.existsBy("email", user.getEmail()))
            context.buildConstraintViolationWithTemplate("{UserExistence.email}")
                .addPropertyNode("email").addConstraintViolation();

        return !userRepository.existsBy("username", user.getUsername()) ||
               !userRepository.existsBy("email", user.getEmail());

    }
}
