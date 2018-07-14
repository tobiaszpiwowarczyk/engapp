package pl.piwowarczyk.dbservice.unit.service;

import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;

import java.util.List;
import java.util.Map;

public interface UnitService {
    List<Unit> findAll();
    Unit findById(String id);
    Unit addUnit(UnitCreationEntity unit);
    Unit editUnit(UnitEditionEntity unit);
    Map deleteUnit(String id);
}
