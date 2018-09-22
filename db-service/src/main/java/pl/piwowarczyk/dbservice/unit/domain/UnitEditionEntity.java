package pl.piwowarczyk.dbservice.unit.domain;

import lombok.Builder;
import lombok.Data;
import pl.piwowarczyk.dbservice.unit.validator.*;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.ColorNotBlankProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.ColorPatternProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.NameNotBlankProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.NamePatternProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.*;
import pl.piwowarczyk.dbservice.validator.CorrectId;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Builder
@VerifyUnit(groups = VerifyUnitGroup.class)
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
    
    private String image;
}
