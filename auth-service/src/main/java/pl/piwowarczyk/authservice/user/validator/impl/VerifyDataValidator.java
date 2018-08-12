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

        String username = user.getUsername() != null ? user.getUsername() : "";
        String email = user.getEmail() != null ? user.getEmail() : "";
        
        if(username.equals(userFound.getUsername()) && email.equals(userFound.getEmail()))
            return true;
        
        if(!username.equals(userFound.getUsername()) && userRepository.existsBy("username", username))
            context.buildConstraintViolationWithTemplate("{UserExistence.username}")
                .addPropertyNode("username").addConstraintViolation();
        
        if(!email.equals(userFound.getEmail()) && userRepository.existsBy("email", email))
            context.buildConstraintViolationWithTemplate("{UserExistence.email}")
                .addPropertyNode("email").addConstraintViolation();

        return !userRepository.existsBy("username", username) ||
               !userRepository.existsBy("email", email);

    }
}
