package pl.piwowarczyk.dbservice.word.validator.order;

import javax.validation.GroupSequence;

public class WordCreationEntityValidationOrder {
    
    public interface PolishNotBlankProperty {}
    public interface PolishExistenceProperty {}
    
    @GroupSequence({PolishNotBlankProperty.class, PolishExistenceProperty.class})
    public interface PolishGroupSequence {}

    public interface EnglishNotBlankProperty {}
    public interface EnglishExistenceProperty {}

    @GroupSequence({EnglishNotBlankProperty.class, EnglishExistenceProperty.class})
    public interface EnglishGroupSequence {}
}
