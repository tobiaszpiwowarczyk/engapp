package pl.piwowarczyk.dbservice.unit.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.piwowarczyk.dbservice.unit.Unit;

@Repository
public interface UnitRepository extends UnitRepositoryCustom, MongoRepository<Unit, String> {}
