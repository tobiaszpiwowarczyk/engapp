package pl.piwowarczyk.dbservice.unit.repository;

import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;

import java.util.List;
import java.util.Map;

public interface UnitRepositoryCustom {
    List<Unit> findAllUnits();
    Unit findUnitById(String id);
    Unit editUnit(UnitEditionEntity unit);
    Word findWordByWordNumber(String unitId, Long wordNumber);
    boolean wordExistsByWordNumber(String unitId, Long wordNumber);
    boolean existsBy(String field, Object value);
    boolean wordExistsBy(String unitId, String field, Object value);
    
    Word addWord(WordCreationEntity word);
    Word editWord(WordEditionEntity word);
    Map<String, String> deleteWord(String unitId, Long wordNumber);
}
