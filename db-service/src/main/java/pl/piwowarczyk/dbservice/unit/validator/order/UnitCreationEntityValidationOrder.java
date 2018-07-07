package pl.piwowarczyk.dbservice.unit.validator.order;

import javax.validation.GroupSequence;

public class UnitCreationEntityValidationOrder {
    
    public interface NameNotBlankProperty {}
    public interface NamePatternProperty {}
    public interface NameUnitExistenceProperty {}
    
    @GroupSequence({NameNotBlankProperty.class, NamePatternProperty.class, NameUnitExistenceProperty.class})
    public interface NameGroupSequence {}
    
    
    public interface ColorNotBlankProperty {}
    public interface ColorPatternProperty {}
    
    @GroupSequence({ColorNotBlankProperty.class, ColorPatternProperty.class})
    public interface ColorGroupSequence {}
    
}
