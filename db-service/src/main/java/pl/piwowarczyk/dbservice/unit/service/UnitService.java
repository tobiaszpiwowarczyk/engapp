package pl.piwowarczyk.dbservice.unit.service;

import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

public interface UnitService {
    List<Unit> findAll(boolean admin);
    Unit findById(String id, boolean admin);
    Unit addUnit(UnitCreationEntity unit);
    Unit editUnit(UnitEditionEntity unit);
    Map deleteUnit(@NotBlank(message = "Identyfikator jest wymagany") String id);
}
