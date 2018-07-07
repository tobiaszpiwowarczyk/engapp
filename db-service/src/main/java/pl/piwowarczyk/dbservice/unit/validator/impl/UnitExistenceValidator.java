package pl.piwowarczyk.dbservice.unit.validator.impl;

import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UnitExistenceValidator implements ConstraintValidator<UnitExistence, String> {
    
    private UnitRepository unitRepository;
    private UnitExistence unitExistence;

    public UnitExistenceValidator(UnitRepository unitRepository) {
        this.unitRepository = unitRepository;
    }

    @Override
    public void initialize(UnitExistence constraintAnnotation) {
        this.unitExistence = constraintAnnotation;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return unitRepository.existsBy(unitExistence.property(), value, "units") == unitExistence.exists();
    }
}
