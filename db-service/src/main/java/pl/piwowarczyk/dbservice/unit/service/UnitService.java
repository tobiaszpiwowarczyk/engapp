package pl.piwowarczyk.dbservice.unit.service;

import org.springframework.web.multipart.MultipartFile;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface UnitService {
    List<Unit> findAll();
    Unit findById(String id);
    Unit addUnit(UnitCreationEntity unit);
    Unit editUnit(UnitEditionEntity unit);
    Unit editUnitImage(String unitId, MultipartFile image) throws IOException;
    Map deleteUnit(String id);
}
