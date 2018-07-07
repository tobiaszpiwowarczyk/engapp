package pl.piwowarczyk.dbservice.unit.repository;

import org.springframework.stereotype.Repository;
import pl.piwowarczyk.dbservice.repository.BaseRepository;
import pl.piwowarczyk.dbservice.unit.Unit;

@Repository
public interface UnitRepository extends UnitRepositoryCustom, BaseRepository<Unit, String> {}
