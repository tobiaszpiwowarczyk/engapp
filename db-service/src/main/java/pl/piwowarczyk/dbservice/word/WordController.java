package pl.piwowarczyk.dbservice.word;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.service.WordServiceImpl;
import pl.piwowarczyk.library.util.ValidationService;

import javax.validation.constraints.Min;

import java.util.Map;

import static pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.*;

@RestController
@RequestMapping("api/word")
@AllArgsConstructor
@Validated({IdGroupSequence.class})
public class WordController {
    
    private WordServiceImpl wordService;
    private ValidationService valdiationService;


    /**
     * Find word from unit.
     * The unit is finding by {@param #unitId} and word by {@param #id}
     * 
     * @param unitId must be valid
     * @param id must be number and must be greater or equal to 1
     * @return persisted {@link Word} object
     */
    @GetMapping("{unitId}/{id}")
    public Word findById(
            @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String unitId, 
            
            @Min(value = 1, message = "Podana liczba jest nieprawidłowa", groups = IdPatternProperty.class)
            @PathVariable Long id) {
        return wordService.findWordByWordNumber(unitId, id);
    }

    /**
     * 
     * Add word to unit
     * 
     * @param unitId {@link String} - the unit id
     * @param word {@link Word} - the word
     * @return {@link Word} - created word
     */
    @PostMapping("{unitId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Word addWord(
            @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String unitId,
            @RequestBody WordCreationEntity word
    ) {
        return wordService.addWord(unitId, word);
    }


    /**
     * Updates word by its {@param Word#wordNumber} and saves to database 
     * 
     * @param unitId {@link String} - the unit id
     * @param word {@link Word} - word
     * @return {@link Word} - updated word
     */
    @PutMapping("{unitId}")
    public Word editWord(
            @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String unitId, 
            @RequestBody Word word
    ) {
        return wordService.editWord(unitId, word);
    }

    /**
     * Removes word from unit
     * 
     * @param unitId {@link String} - the unit id
     * @param wordNumber {@link Long} - word number
     * @return {@link Map<String, String>} - deletion state message
     */
    @DeleteMapping("{unitId}/{wordNumber}")
    public Map<String, String> deleteWord(@PathVariable String unitId, @PathVariable Long wordNumber) {
        return wordService.deleteWord(unitId, wordNumber);
    }
}
