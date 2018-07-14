package pl.piwowarczyk.dbservice.unit.validator.impl;

import lombok.AllArgsConstructor;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.unit.validator.VerifyUnit;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

@AllArgsConstructor
public class VerifyUnitValidator implements ConstraintValidator<VerifyUnit, UnitEditionEntity> {

    private UnitRepository unitRepository;

    @Override
    public boolean isValid(UnitEditionEntity unit, ConstraintValidatorContext context) {

        context.disableDefaultConstraintViolation();
        Unit unitFound = unitRepository.findById(unit.getId()).get();

        if (unit.getName().equals(unitFound.getName()))
            return true;
        else if (unitRepository.existsBy("name", unit.getName()))
            context.buildConstraintViolationWithTemplate("{UnitExistence.name}")
                    .addPropertyNode("name").addConstraintViolation();

        return !unitRepository.existsBy("name", unit.getName());
    }
}
