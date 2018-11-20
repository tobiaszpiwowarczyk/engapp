package pl.piwowarczyk.dbservice.errorreport.repository;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.piwowarczyk.dbservice.errorreport.ErrorReport;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.newAggregation;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.project;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.sort;
import static org.springframework.data.mongodb.core.aggregation.ConditionalOperators.IfNull.ifNull;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
public class ErrorReportRepositoryImpl implements ErrorReportRepositoryCustom {

    private static final String COLLECTION_NAME = "error_reports";
    private MongoOperations mongoOperations;

    @Override
    public List<ErrorReport> findAllErrorReports() {
        return mongoOperations.aggregate(
                newAggregation(
                        project("id", "username", "createdAt", "read")
                                .and(ifNull("subject").then("Brak tematu")).as("subject"),
                        sort(
                                Sort.by(new Sort.Order(Sort.Direction.DESC, "createdAt"))
                        )
                ),
                COLLECTION_NAME, ErrorReport.class).getMappedResults();
    }

    @Override
    public void markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity) {
        mongoOperations.updateMulti(
                new Query(where("_id").in(markAsReadEntity.getReportIds().stream().map(ObjectId::new).collect(Collectors.toList()))),
                new Update() {{
                    set("read", markAsReadEntity.getRead());
                }},
                COLLECTION_NAME
        );
    }
}
