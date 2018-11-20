package pl.piwowarczyk.dbservice.word.validator.impl;

import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;
import pl.piwowarczyk.dbservice.word.validator.WordNumberNotOutOfBound;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class WordNumberNotOutOfBoundValidator implements ConstraintValidator<WordNumberNotOutOfBound, WordEditionEntity> {

    private UnitRepository unitRepository;

    public WordNumberNotOutOfBoundValidator(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Override
    public boolean isValid(WordEditionEntity value, ConstraintValidatorContext context) {
        if(unitRepository.findUnitById(value.getUnitId()).getWordsCount() < value.getWordNumber()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Numer rozdziału jest poza zakresem ilości słówek w rozdziale")
                    .addPropertyNode("wordNumber").addConstraintViolation();
            return false;
        }
        return true;
    }
}
