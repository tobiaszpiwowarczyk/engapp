package pl.piwowarczyk.dbservice.errorreport.repository;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;

import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
public class ErrorReportRepositoryImpl implements ErrorReportRepositoryCustom {
    
    private MongoOperations mongoOperations;
    
    @Override
    public void markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity) {
        mongoOperations.updateMulti(
                new Query(where("_id").in(markAsReadEntity.getReportIds().stream().map(ObjectId::new).collect(Collectors.toList()))),
                new Update() {{
                    set("read", markAsReadEntity.getRead());
                }},
                "error_reports"
        );
    }
}
