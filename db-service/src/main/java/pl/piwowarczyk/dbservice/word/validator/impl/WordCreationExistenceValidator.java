package pl.piwowarczyk.dbservice.word.validator.impl;

import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.validator.WordCreationExistence;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.Field;

public class WordCreationExistenceValidator implements ConstraintValidator<WordCreationExistence, WordCreationEntity> {
    
    private WordCreationExistence wordCreationExistence;
    private UnitRepository unitRepository;

    public WordCreationExistenceValidator(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Override
    public void initialize(WordCreationExistence constraintAnnotation) {
        this.wordCreationExistence = constraintAnnotation;
    }

    @Override
    public boolean isValid(WordCreationEntity value, ConstraintValidatorContext context) {
        try {
            Field field = value.getClass().getDeclaredField(wordCreationExistence.field());
            field.setAccessible(true);
            
            if(unitRepository.wordExistsBy(value.getUnitId(), "words."+ wordCreationExistence.field(), field.get(value)) == !wordCreationExistence.exists()) {
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("Słowo według tego pola już istnieje w tym rozdziale")
                        .addPropertyNode(wordCreationExistence.field())
                        .addConstraintViolation();
                return false;
            }
            
            return unitRepository.wordExistsBy(value.getUnitId(), "words."+ wordCreationExistence.field(), field.get(value)) == wordCreationExistence.exists();
        }
        catch(Exception e) {
            return false;
        }
    }
}
