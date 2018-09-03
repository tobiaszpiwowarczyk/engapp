package pl.piwowarczyk.dbservice.unit.repository;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.library.util.UserPermissions;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
public class UnitRepositoryImpl implements UnitRepositoryCustom {

    private final String collectionName = "units";
    private MongoTemplate mongoTemplate;

    
    @Override
    public List<Unit> findAllUnits() {
        Aggregation aggregation = UserPermissions.isAdmin() ? newAggregation(
                project("id", "name", "color", "image", "published")
                        .and("words").size().as("wordsCount")
        ) : newAggregation(
                match(where("published").is(true)),
                project("id", "name", "color", "image")
        );

        return mongoTemplate.aggregate(aggregation, collectionName, Unit.class).getMappedResults();
    }

    
    @Override
    public Unit findUnitById(String id) {

        Aggregation aggregation = newAggregation(
                match(where("_id").is(new ObjectId(id))),
                UserPermissions.isAdmin() ? project("id", "name", "color", "words", "image", "published")
                        .and("words").size().as("wordsCount") :
                        project("id", "name", "color")
                                .and("words").size().as("wordsCount")
        );

        return mongoTemplate.aggregate(aggregation, collectionName, Unit.class).getUniqueMappedResult();
    }

    
    @Override
    public Unit editUnit(UnitEditionEntity unit) {
        mongoTemplate.updateFirst(
                new Query(where("_id").is(new ObjectId(unit.getId()))),
                new Update() {{
                    if(unit.getName() != null) set("name", unit.getName());
                    if(unit.getColor() != null) set("color", unit.getColor());
                    if(unit.getPublished() != null) set("published", unit.getPublished());
                }},
                Unit.class,
                collectionName
        );
        
        return this.findUnitById(unit.getId());
    }


    @Override
    public Word findWordByWordNumber(String unitId, Long wordNumber) {
        Aggregation aggregation = newAggregation(
                unwind("$words"),
                match(where("_id").is(new ObjectId(unitId)).and("words.wordNumber").is(wordNumber)),
                project()
                        .and("words.wordNumber").as("wordNumber")
                        .and("words.polish").as("polish")
                        .and("words.english").as("english")
        );
        
        return mongoTemplate.aggregate(aggregation, collectionName, Word.class).getUniqueMappedResult();
    }

    
    @Override
    public boolean existsByWordNumber(String unitId, Long wordNumber) {
        return mongoTemplate.count(new Query().addCriteria(where("_id").is(unitId).and("words.wordNumber").is(wordNumber)), collectionName) == 1;
    }

    @Override
    public boolean existsBy(String field, Object value) {
        return mongoTemplate.count(new Query().addCriteria(where(field).is(value)), collectionName) == 1;
    }
}
