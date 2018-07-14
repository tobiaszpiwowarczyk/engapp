package pl.piwowarczyk.dbservice.unit.repository;

import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.word.Word;

import java.util.List;

public interface UnitRepositoryCustom {
    List<Unit> findAllUnits();
    Unit findUnitById(String id);
    Unit editUnit(UnitEditionEntity unit);
    Word findWordByWordNumber(String unitId, Long wordNumber);
    boolean existsByWordNumber(String unitId, Long wordNumber);
    boolean existsBy(String field, Object value);
}
