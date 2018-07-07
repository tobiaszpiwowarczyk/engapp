package pl.piwowarczyk.dbservice.unit.domain;

import lombok.Data;
import pl.piwowarczyk.dbservice.unit.validator.*;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.*;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.*;
import pl.piwowarczyk.dbservice.validator.CorrectId;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@VerifyUnit(groups = NameUnitExistenceProperty.class)
public class UnitEditionEntity {

    @NotBlank(groups = IdNotBlankProperty.class)
    @CorrectId(groups = IdPatternProperty.class)
    @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
    private String id;
    
    
    @NotBlank(groups = NameNotBlankProperty.class)
    @CorrectUnitName(groups = NamePatternProperty.class)
    private String name;
    
    @NotBlank(groups = ColorNotBlankProperty.class)
    @CorrectColor(groups = ColorPatternProperty.class)
    private String color;
    
    @NotNull(groups = PublishedNotBlankProperty.class)
    @CorrectBoolean(groups = PublishedCorrectProperty.class)
    private Boolean published;
    
}
