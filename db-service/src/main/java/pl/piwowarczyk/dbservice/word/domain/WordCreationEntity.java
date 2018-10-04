package pl.piwowarczyk.dbservice.word.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder;
import pl.piwowarczyk.dbservice.validator.CorrectId;
import pl.piwowarczyk.dbservice.word.validator.WordCreationExistence;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.EnglishExistenceProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.EnglishNotBlankProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.PolishExistenceProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.PolishNotBlankProperty;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@WordCreationExistence.List({
        @WordCreationExistence(exists = false, field = "polish", groups = PolishExistenceProperty.class),
        @WordCreationExistence(exists = false, field = "english", groups = EnglishExistenceProperty.class)
})
public class WordCreationEntity {

    @NotBlank(message = "Identyfikator jest wymagany", groups = UnitEditionEntityValidationOrder.IdNotBlankProperty.class)
    @CorrectId(message = "Podany identyfikator jest nieprawidłowy", groups = UnitEditionEntityValidationOrder.IdPatternProperty.class)
    @UnitExistence(message = "Rozdział o podanym identyfikatorze nie istnieje", exists = true,
            property = "_id", groups = UnitEditionEntityValidationOrder.IdExistenceProperty.class)
    private String unitId;

    @NotBlank(message = "To pole jest wymagane", groups = PolishNotBlankProperty.class)
    private String polish;

    @NotEmpty(message = "To pole jest wymagane", groups = EnglishNotBlankProperty.class)
    private List<@NotBlank String> english;
}
