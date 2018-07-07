package pl.piwowarczyk.dbservice.unit.domain;

import lombok.Data;
import pl.piwowarczyk.dbservice.unit.validator.CorrectColor;
import pl.piwowarczyk.dbservice.unit.validator.CorrectUnitName;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.*;

import javax.validation.constraints.NotBlank;

@Data
public class UnitCreationEntity {
    
    @NotBlank(groups = NameNotBlankProperty.class)
    @CorrectUnitName(groups = NamePatternProperty.class)
    @UnitExistence(groups = NameUnitExistenceProperty.class, property = "name")
    private String name;
    
    
    
    @NotBlank(groups = ColorNotBlankProperty.class)
    @CorrectColor(groups = ColorPatternProperty.class)
    private String color;
}
