package pl.piwowarczyk.dbservice.unit.validator.order;

import javax.validation.GroupSequence;

public class UnitEditionEntityValidationOrder {
    
    public interface VerifyUnitGroup {}
    
    public interface IdNotBlankProperty {}
    public interface IdPatternProperty {}
    public interface IdExistenceProperty {}
    
    @GroupSequence({IdNotBlankProperty.class, IdPatternProperty.class, IdExistenceProperty.class, VerifyUnitGroup.class})
    public interface IdGroupSequence {}
    
    
    
    public interface PublishedNotBlankProperty {}
    public interface PublishedCorrectProperty {}
    
    @GroupSequence({PublishedNotBlankProperty.class, PublishedCorrectProperty.class})
    public interface PublishedGroupSequence {}
}
