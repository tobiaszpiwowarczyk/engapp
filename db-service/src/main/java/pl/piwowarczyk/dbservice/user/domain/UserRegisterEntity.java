package pl.piwowarczyk.dbservice.user.domain;

import lombok.Data;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.user.validator.CorrectEmail;
import pl.piwowarczyk.dbservice.user.validator.CorrectName;
import pl.piwowarczyk.dbservice.user.validator.UserExistence;
import pl.piwowarczyk.dbservice.user.validator.order.UserValidationOrder.*;
import pl.piwowarczyk.dbservice.validator.PasswordStrength;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class UserRegisterEntity {

    @NotBlank(groups = UsernameNotBlankProperty.class)
    @Size(min = 6, groups = UsernameSizeProperty.class)
    @UserExistence(property = "username", groups = UsernameExistenceProperty.class)
    private String username;
    
    @NotBlank(groups = PasswordNotBlankProperty.class)
    @Size(min = 7, groups = PasswordSizeProperty.class)
    @PasswordStrength(groups = PasswordStrengthProperty.class)
    private String password;
    
    @NotBlank(groups = FirstNameNotBlankProperty.class)
    @CorrectName(groups = FirstNameCorrectProperty.class)
    private String firstName;
    
    @NotBlank(groups = LastNameNotBlankProperty.class)
    @CorrectName(groups = LastNameCorrectProperty.class)
    private String lastName;
    
    @NotBlank(groups = EmailNotBlankProperty.class)
    @CorrectEmail(groups = EmailCorrectProperty.class)
    @UnitExistence(property = "email", groups = EmailExistenceProperty.class)
    private String email;

}
