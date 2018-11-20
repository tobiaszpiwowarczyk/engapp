package pl.piwowarczyk.dbservice.word.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder;
import pl.piwowarczyk.dbservice.validator.CorrectId;
import pl.piwowarczyk.dbservice.word.validator.WordEditionExistence;
import pl.piwowarczyk.dbservice.word.validator.WordNumberNotOutOfBound;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.EnglishNotBlankProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.PolishNotBlankProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder;
import pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder.WordNumberMinProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder.WordNumberNotBlankProperty;
import pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder.WordNumberOutOfBoundProperty;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@WordEditionExistence.List({
        @WordEditionExistence(field = "polish", groups = WordCreationEntityValidationOrder.PolishExistenceProperty.class),
        @WordEditionExistence(field = "english", groups = WordCreationEntityValidationOrder.EnglishExistenceProperty.class)
})
@WordNumberNotOutOfBound(groups = WordNumberOutOfBoundProperty.class)
public class WordEditionEntity {

    @NotBlank(message = "Identyfikator jest wymagany", groups = WordEditionEntityValidationOrder.UnitIdNotBlankProperty.class)
    @CorrectId(message = "Podany identyfikator jest nieprawidłowy", groups = WordEditionEntityValidationOrder.UnitIdCorrectProperty.class)
    @UnitExistence(message = "Rozdział o podanym identyfikatorze nie istnieje", exists = true,
            property = "_id", groups = WordEditionEntityValidationOrder.UnitIdExistenceProperty.class)
    private String unitId;

    @NotNull(groups = WordNumberNotBlankProperty.class)
    @Min(value = 1, groups = WordNumberMinProperty.class)
    private Long wordNumber;

    @NotBlank(message = "To pole jest wymagane", groups = PolishNotBlankProperty.class)
    private String polish;

    @NotEmpty(message = "To pole jest wymagane", groups = EnglishNotBlankProperty.class)
    private List<String> english;

}
