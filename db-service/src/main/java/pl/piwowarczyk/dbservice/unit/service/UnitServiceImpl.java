package pl.piwowarczyk.dbservice.unit.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.piwowarczyk.dbservice.file.domain.File;
import pl.piwowarczyk.dbservice.file.service.FileServiceImpl;
import pl.piwowarczyk.dbservice.file.utils.FileUtils;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class UnitServiceImpl implements UnitService {

    private UnitRepository unitRepository;


    /**
     * Find all units with additional fields by user permission
     *
     * @return list of {@link Unit} objects
     */
    @Override
    public List<Unit> findAll() {
        return unitRepository.findAllUnits();
    }


    /**
     * Retrieves {@link Unit} object from database by it's {@param id}
     *
     * @param id must not be null
     * @return {@link Unit} object
     */
    @Override
    public Unit findById(String id) {
        return unitRepository.findUnitById(id);
    }
    
    /**
     * Add {@link Unit} object to database
     *
     * @param unit {@link UnitCreationEntity} must be valid
     * @return persisted {@link Unit} object
     */
    @Override
    public Unit addUnit(UnitCreationEntity unit) {
        
        return unitRepository.save(
                Unit.builder()
                        .name(unit.getName())
                        .color(unit.getColor())
                        .image(FileUtils.IMAGE_PREFIX + FileUtils.DEFAULT_UNIT_IMAGE)
                        .build()
        );
    }

    /**
     * Method for updating {@link Unit} object
     *
     * @param unit {@link UnitEditionEntity} must be valid
     * @return edited {@link Unit} object
     */
    @Override
    public Unit editUnit(UnitEditionEntity unit) {
        return unitRepository.editUnit(unit);
    }

    @Override
    public Unit editUnitImage(String unitId, MultipartFile image) throws IOException {
        File file = FileUtils.saveFile(image, "img");
        Unit unit = findById(unitId);
        
        return unitRepository.editUnit(
                UnitEditionEntity.builder()
                        .id(unit.getId())
                        .name(unit.getName())
                        .color(unit.getColor())
                        .published(unit.getPublished())
                        .build()
        );
    }


    /**
     * Deletes {@link Unit} object from database
     *
     * @param id must be valid
     * @return {@link Map} width {@code state} message
     */
    @Override
    public Map deleteUnit(String id) {
        unitRepository.deleteById(id);
        return Collections.singletonMap("state", "Rozdział został usunięty");
    }
}
