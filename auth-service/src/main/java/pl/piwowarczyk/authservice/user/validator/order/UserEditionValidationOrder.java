package pl.piwowarczyk.authservice.user.validator.order;

import javax.validation.GroupSequence;

public class UserEditionValidationOrder {

    public interface VerifyUserGroup {}

    public interface IdNotBlankProperty {}
    public interface IdCorrectProperty {}
    public interface IdExistenceProperty {}

    @GroupSequence({IdNotBlankProperty.class, IdCorrectProperty.class, IdExistenceProperty.class, VerifyUserGroup.class})
    public interface IdGroupSequence {}
    
}
