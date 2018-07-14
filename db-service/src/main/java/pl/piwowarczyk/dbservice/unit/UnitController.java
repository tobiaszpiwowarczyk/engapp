package pl.piwowarczyk.dbservice.unit;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.dbservice.unit.domain.UnitCreationEntity;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.unit.service.UnitServiceImpl;
import pl.piwowarczyk.dbservice.unit.validator.UnitExistence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.ColorGroupSequence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitCreationEntityValidationOrder.NameGroupSequence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.IdExistenceProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.IdGroupSequence;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.IdNotBlankProperty;
import pl.piwowarczyk.dbservice.unit.validator.order.UnitEditionEntityValidationOrder.PublishedGroupSequence;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/unit")
@AllArgsConstructor
@Validated(IdGroupSequence.class)
public class UnitController {

    private UnitServiceImpl unitService;

    /**
     * Find all units with additional fields by user permission
     *
     * @return list of {@link Unit} objects
     */
    @GetMapping
    public List<Unit> findAll() {
        return unitService.findAll();
    }


    /**
     * Retrieves {@link Unit} object from database by it's {@param id}
     *
     * @param id must not be null
     * @return {@link Unit} object
     */
    @GetMapping("{id}")
    public Unit findById(
            @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String id
    ) {
        return unitService.findById(id);
    }


    /**
     * Adds {@link Unit} object to database
     *
     * @param unit {@link UnitCreationEntity} must be valid
     * @return persisted {@link Unit} object
     */
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Unit addUnit(
            @Validated({NameGroupSequence.class, ColorGroupSequence.class})
            @RequestBody UnitCreationEntity unit
    ) {
        return unitService.addUnit(unit);
    }


    /**
     * Method for updating {@link Unit} object
     *
     * @param unit {@link UnitEditionEntity} must be valid
     * @return edited {@link Unit} object
     */
    @PutMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Unit editUnit(
            @Validated({IdGroupSequence.class, NameGroupSequence.class, ColorGroupSequence.class, PublishedGroupSequence.class})
            @RequestBody UnitEditionEntity unit
    ) {
        return unitService.editUnit(unit);
    }


    /**
     * Deletes {@link Unit} object from database
     *
     * @param id must be valid
     * @return {@link Map} width {@code state} message
     */
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Map deleteUnit(
            @NotBlank(groups = IdNotBlankProperty.class)
            @UnitExistence(exists = true, property = "_id", groups = IdExistenceProperty.class)
            @PathVariable String id
    ) {
        return unitService.deleteUnit(id);
    }
}
