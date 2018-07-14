package pl.piwowarczyk.authservice.user.domain;

import lombok.Data;
import pl.piwowarczyk.authservice.user.validator.CorrectEmail;
import pl.piwowarczyk.authservice.user.validator.CorrectName;
import pl.piwowarczyk.authservice.user.validator.UserExistence;
import pl.piwowarczyk.authservice.user.validator.order.UserRegisterValidationOrder;
import pl.piwowarczyk.authservice.validator.PasswordStrength;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserRegisterEntity {

    @NotBlank(groups = UserRegisterValidationOrder.UsernameNotBlankProperty.class)
    @Size(min = 6, groups = UserRegisterValidationOrder.UsernameSizeProperty.class)
    @UserExistence(property = "username", groups = UserRegisterValidationOrder.UsernameExistenceProperty.class)
    private String username;
    
    @NotBlank(groups = UserRegisterValidationOrder.PasswordNotBlankProperty.class)
    @Size(min = 7, groups = UserRegisterValidationOrder.PasswordSizeProperty.class)
    @PasswordStrength(groups = UserRegisterValidationOrder.PasswordStrengthProperty.class)
    private String password;
    
    @NotBlank(groups = UserRegisterValidationOrder.FirstNameNotBlankProperty.class)
    @CorrectName(groups = UserRegisterValidationOrder.FirstNameCorrectProperty.class)
    private String firstName;
    
    @NotBlank(groups = UserRegisterValidationOrder.LastNameNotBlankProperty.class)
    @CorrectName(groups = UserRegisterValidationOrder.LastNameCorrectProperty.class)
    private String lastName;
    
    @NotBlank(groups = UserRegisterValidationOrder.EmailNotBlankProperty.class)
    @CorrectEmail(groups = UserRegisterValidationOrder.EmailCorrectProperty.class)
    @UserExistence(property = "email", groups = UserRegisterValidationOrder.EmailExistenceProperty.class)
    private String email;

}
