package pl.piwowarczyk.dbservice.word.validator.impl;

import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;
import pl.piwowarczyk.dbservice.word.validator.WordEditionExistence;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;

public class WordEditionExistenceValidator implements ConstraintValidator<WordEditionExistence, WordEditionEntity> {

    private WordEditionExistence wordEditionExistence;
    private UnitRepository unitRepository;

    public WordEditionExistenceValidator(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Override
    public void initialize(WordEditionExistence constraintAnnotation) {
        this.wordEditionExistence = constraintAnnotation;
    }

    @Override
    public boolean isValid(WordEditionEntity value, ConstraintValidatorContext context) {
        try {

            Word word = unitRepository.findUnitById(value.getUnitId()).getWords().stream()
                    .filter(x -> x.getWordNumber().equals(value.getWordNumber()))
                    .findFirst().orElse(new Word());
            
            Field field = value.getClass().getDeclaredField(wordEditionExistence.field());
            Field wordFoundField = word.getClass().getDeclaredField(wordEditionExistence.field());
            field.setAccessible(true);
            wordFoundField.setAccessible(true);

            if(wordFoundField.get(word).equals(field.get(value))) return true;

            if(unitRepository.wordExistsBy(value.getUnitId(), "words."+wordEditionExistence.field(), field.get(value))) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Słowo według tego pola już istnieje w tym rozdziale")
                        .addPropertyNode(wordEditionExistence.field()).addConstraintViolation();

                return false;
            }

            return true;
        }
        catch(Exception e) {
            return false;
        }
    }
}
