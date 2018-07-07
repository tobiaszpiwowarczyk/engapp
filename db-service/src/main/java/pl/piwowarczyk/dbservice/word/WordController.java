package pl.piwowarczyk.dbservice.word;

import lombok.AllArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.validator.CorrectId;
import pl.piwowarczyk.dbservice.word.service.WordServiceImpl;

import javax.validation.constraints.Min;

import static pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.*;

@RestController
@RequestMapping("api/word")
@AllArgsConstructor
@Validated({IdGroupSequence.class})
public class WordController {
    
    private WordServiceImpl wordService;


    /**
     * Find word from unit.
     * The unit is finding by {@param #unitId} and word by {@param #id}
     * 
     * @param unitId must be valid
     * @param id must be number and must be greater or equal to {@code 1}
     * @return persisted {@link Word} object
     */
    @GetMapping("{unitId}/{id}")
    public Word findById(
            @CorrectId(groups = IdPatternProperty.class)
            @UnitExistence(exists = true, message = "{UnitExistence.id}", property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String unitId, 
            
            @Min(value = 1, message = "Podana liczba jest nieprawidłowa", groups = IdPatternProperty.class)
            @PathVariable Long id) {
        return wordService.findWordByWordNumber(unitId, id);
    }
}
