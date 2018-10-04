package pl.piwowarczyk.dbservice.word;

import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;
import pl.piwowarczyk.dbservice.word.service.WordServiceImpl;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.EnglishGroupSequence;
import pl.piwowarczyk.dbservice.word.validator.order.WordCreationEntityValidationOrder.PolishGroupSequence;
import pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder.WordNumberGroupSequence;
import pl.piwowarczyk.library.model.CustomValidationError;
import pl.piwowarczyk.library.util.ValidationService;

import java.util.List;
import java.util.Map;

import static pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.IdGroupSequence;
import static pl.piwowarczyk.dbservice.word.validator.order.WordEditionEntityValidationOrder.UnitIdGroupSequence;

@RestController
@RequestMapping("api/word")
@AllArgsConstructor
@Validated({IdGroupSequence.class})
public class WordController {

    private WordServiceImpl wordService;
    private ValidationService validationService;
    private MessageSource messageSource;


    
    
    /**
     * Find word from unit.
     * The unit is finding by {@param #id} and word by {@param #id}
     *
     * @param unitId must be valid
     * @param id     must be number and must be greater or equal to 1
     * @return persisted {@link Word} object
     */
    @GetMapping("{unitId}/{id}")
    public Word findById(String unitId, @PathVariable Long id) {
        return wordService.findWordByWordNumber(unitId, id);
    }

    
    
    
    /**
     * Add word to unit
     *
     * @param word {@link Word} - the word
     * @return {@link Word} - created word
     */
    @PostMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @ResponseStatus(HttpStatus.CREATED)
    public Word addWord(
            @Validated({IdGroupSequence.class, PolishGroupSequence.class, EnglishGroupSequence.class}) 
            @RequestBody WordCreationEntity word) {
        return wordService.addWord(word);
    }

    
    
    
    
    /**
     * Method for {@link WordCreationEntity} object validation
     *
     * @param word {@link WordCreationEntity} - the word
     * @param bindingResult  {@link BindingResult} - validation result
     * @param field {@link String} - the {@link WordCreationEntity} field name. This is optional
     *                            value. Default value is equal to empty string and validate
     *                            all fields in {@param word} object
     * @return {@link ResponseEntity} with empty array if validation is correct, otherwise
     *          returns list of {@link CustomValidationError} objects
     */
    @PostMapping("validate")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CustomValidationError>> addWordValidation(
            @Validated({IdGroupSequence.class, PolishGroupSequence.class, EnglishGroupSequence.class}) 
            @RequestBody WordCreationEntity word,
            
            BindingResult bindingResult,
            @RequestParam(required = false, defaultValue = "") String field
    ) {
        return validationService.validate(bindingResult, messageSource, field);
    }

    
    
    

    /**
     * Updates word by its {@param Word#wordNumber} and saves to database
     *
     * @param word   {@link Word} - word
     * @return {@link Word} - updated word
     */
    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Word editWord(
            @Validated({UnitIdGroupSequence.class, WordNumberGroupSequence.class, PolishGroupSequence.class, EnglishGroupSequence.class}) 
            @RequestBody WordEditionEntity word
    ) {
        return wordService.editWord(word);
    }

    
    
    
    /**
     * Method for {@link WordEditionEntity} object validation
     * 
     * @param word {@link WordEditionEntity} - the word
     * @param bindingResult {@link BindingResult} - validation result
     * @param field {@link String} - the {@link WordEditionEntity} field name. This is optional
     *                            value. Default value is equal to empty string and validate
     *                            all fields in {@param word} object
     * @return {@link ResponseEntity} with empty array if validation is correct, otherwise
     *          returns list of {@link CustomValidationError} objects
     */
    @PutMapping("validate")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<List<CustomValidationError>> editWordValidation(
            @Validated({UnitIdGroupSequence.class, WordNumberGroupSequence.class, PolishGroupSequence.class, EnglishGroupSequence.class})
            @RequestBody WordEditionEntity word,

            BindingResult bindingResult,
            @RequestParam(required = false, defaultValue = "") String field
    ) {
        return validationService.validate(bindingResult, messageSource, field);
    }
    
    
    
    
    /**
     * Removes word from unit
     *
     * @param unitId     {@link String} - the unit id
     * @param wordNumber {@link Long} - word number
     * @return {@link Map} - deletion state message
     */
    @DeleteMapping("{unitId}/{wordNumber}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Map<String, String> deleteWord(@PathVariable String unitId, @PathVariable Long wordNumber) {
        return wordService.deleteWord(unitId, wordNumber);
    }
}
