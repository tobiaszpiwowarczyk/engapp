package pl.piwowarczyk.dbservice.word.validator.order;

import javax.validation.GroupSequence;

public class WordEditionEntityValidationOrder {
    
    public interface UnitIdNotBlankProperty {}
    public interface UnitIdCorrectProperty {}
    public interface UnitIdExistenceProperty {}
    public interface WordNumberOutOfBoundProperty {}
    
    @GroupSequence({UnitIdNotBlankProperty.class, UnitIdCorrectProperty.class, UnitIdExistenceProperty.class, WordNumberOutOfBoundProperty.class})
    public interface UnitIdGroupSequence {}
    
    public interface WordNumberNotBlankProperty {}
    public interface WordNumberMinProperty {}
    
    @GroupSequence({WordNumberNotBlankProperty.class, WordNumberMinProperty.class})
    public interface WordNumberGroupSequence {}
    
}
