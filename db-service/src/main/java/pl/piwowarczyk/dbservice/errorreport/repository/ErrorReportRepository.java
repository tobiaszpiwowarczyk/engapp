package pl.piwowarczyk.dbservice.errorreport.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.piwowarczyk.dbservice.errorreport.ErrorReport;

@Repository
public interface ErrorReportRepository extends MongoRepository<ErrorReport, String>, ErrorReportRepositoryCustom {}
