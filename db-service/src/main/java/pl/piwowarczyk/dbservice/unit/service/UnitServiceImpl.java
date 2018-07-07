package pl.piwowarczyk.dbservice.unit.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class UnitServiceImpl implements UnitService {

    private UnitRepository unitRepository;

    @Override
    public List<Unit> findAll(boolean admin) {
        return unitRepository.findAllUnits(admin);
    }

    @Override
    public Unit findById(String id, boolean admin) {
        return unitRepository.findUnitById(id, admin);
    }

    @Override
    public Unit addUnit(UnitCreationEntity unit) {
        return unitRepository.save(
                Unit.builder()
                        .name(unit.getName())
                        .color(unit.getColor())
                        .build()
        );
    }

    @Override
    public Unit editUnit(UnitEditionEntity unit) {
        return unitRepository.editUnit(unit);
    }

    @Override
    public Map deleteUnit(String id) {
        unitRepository.deleteById(id);
        return Collections.singletonMap("state", "Rozdział został usunięty");
    }
}
