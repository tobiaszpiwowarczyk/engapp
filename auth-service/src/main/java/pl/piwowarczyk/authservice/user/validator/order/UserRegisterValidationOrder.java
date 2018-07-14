package pl.piwowarczyk.authservice.user.validator.order;

import javax.validation.GroupSequence;


// TODO: 02.07.18 Create module for creating interfaces dynamically 
public class UserRegisterValidationOrder {
        
    public interface UsernameNotBlankProperty {}
    public interface UsernameSizeProperty {}
    public interface UsernameExistenceProperty {}
    
    @GroupSequence({UsernameNotBlankProperty.class, UsernameSizeProperty.class, UsernameExistenceProperty.class})
    public interface UsernameGroupSequence {}


    //----------------------------------------------------------------------------------------------------------------
    
    
    public interface PasswordNotBlankProperty {}
    public interface PasswordSizeProperty {}
    public interface PasswordStrengthProperty {}
    
    @GroupSequence({PasswordNotBlankProperty.class, PasswordSizeProperty.class, PasswordStrengthProperty.class})
    public interface PasswordGroupSequence {}

    
    //----------------------------------------------------------------------------------------------------------------
    
    
    public interface FirstNameNotBlankProperty {}
    public interface FirstNameCorrectProperty {}
    
    @GroupSequence({FirstNameNotBlankProperty.class, FirstNameCorrectProperty.class})
    public interface FirstNameGroupSequence {}


    //----------------------------------------------------------------------------------------------------------------
    
    
    public interface LastNameNotBlankProperty {}
    public interface LastNameCorrectProperty {}

    @GroupSequence({LastNameNotBlankProperty.class, LastNameCorrectProperty.class})
    public interface LastNameGroupSequence {}


    //----------------------------------------------------------------------------------------------------------------
    
    
    public interface EmailNotBlankProperty {}
    public interface EmailCorrectProperty {}
    public interface EmailExistenceProperty {}
    
    @GroupSequence({EmailNotBlankProperty.class, EmailCorrectProperty.class, EmailExistenceProperty.class})
    public interface EmailGroupSequence {}
}
