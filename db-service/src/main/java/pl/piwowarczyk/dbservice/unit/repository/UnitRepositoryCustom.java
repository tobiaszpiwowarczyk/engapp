package pl.piwowarczyk.dbservice.unit.repository;

import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;

import java.util.List;
import java.util.Map;

public interface UnitRepositoryCustom {
    List<Unit> findAllUnits();
    Unit findUnitById(String id);
    Unit editUnit(UnitEditionEntity unit);
    Word findWordByWordNumber(String unitId, Long wordNumber);
    boolean existsByWordNumber(String unitId, Long wordNumber);
    boolean existsBy(String field, Object value);
    
    Word addWord(String unitId, WordCreationEntity word);
    Word editWord(String unitId, Word word);
    Map<String, String> deleteWord(String unitId, Long wordNumber);
}
