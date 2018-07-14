package pl.piwowarczyk.authservice.user.domain;

import lombok.Data;
import pl.piwowarczyk.authservice.user.validator.CorrectEmail;
import pl.piwowarczyk.authservice.user.validator.CorrectName;
import pl.piwowarczyk.authservice.user.validator.UserExistence;
import pl.piwowarczyk.authservice.user.validator.VerifyData;
import pl.piwowarczyk.authservice.user.validator.order.UserRegisterValidationOrder.*;
import pl.piwowarczyk.authservice.validator.CorrectId;
import pl.piwowarczyk.authservice.validator.PasswordStrength;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import static pl.piwowarczyk.authservice.user.validator.order.UserEditionValidationOrder.*;


@Data
@VerifyData(groups = VerifyUserGroup.class)
public class UserEditionEntity {

    @NotBlank(groups = IdNotBlankProperty.class)
    @CorrectId(groups = IdCorrectProperty.class)
    @UserExistence(property = "_id", exists = true, groups = IdExistenceProperty.class)
    private String id;

    @NotBlank(groups = UsernameNotBlankProperty.class)
    @Size(min = 6, groups = UsernameSizeProperty.class)
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
    private String email;
}
