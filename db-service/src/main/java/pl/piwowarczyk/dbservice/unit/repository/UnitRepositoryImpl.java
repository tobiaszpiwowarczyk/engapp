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
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;
import pl.piwowarczyk.library.util.UserPermissions;

import java.util.Collections;
import java.util.List;
import java.util.Map;

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
                    if(unit.getImage() != null) set("image", unit.getImage());
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
    public boolean wordExistsByWordNumber(String unitId, Long wordNumber) {
        return mongoTemplate.exists(new Query().addCriteria(where("_id").is(unitId).and("words.wordNumber").is(wordNumber)), collectionName);
    }

    @Override
    public boolean existsBy(String field, Object value) {
        return mongoTemplate.exists(new Query().addCriteria(where(field).is(value)), collectionName);
    }

    @Override
    public boolean wordExistsBy(String unitId, String field, Object value) {
        return mongoTemplate.exists(
                new Query(
                        where("_id").is(new ObjectId(unitId))
                        .and(field).is(value)
                ), 
                collectionName
        );
    }

    @Override
    public Word addWord(WordCreationEntity word) {
                
        long wordCount = (long) (this.findUnitById(word.getUnitId()).getWords().size() + 1);
        mongoTemplate.updateFirst(
                new Query(where("_id").is(new ObjectId(word.getUnitId()))),
                new Update() {{
                    addToSet("words", Word.builder()
                            .wordNumber(wordCount)
                            .polish(word.getPolish())
                            .english(word.getEnglish())
                            .build());
                }},
                Unit.class,
                collectionName
        );
        
        return this.findWordByWordNumber(word.getUnitId(), wordCount);
    }

    @Override
    public Word editWord(WordEditionEntity word) {
        
        mongoTemplate.updateFirst(
                new Query(where("_id").is(new ObjectId(word.getUnitId())).and("words.wordNumber").is(word.getWordNumber())),
                new Update() {{
                    if(word.getPolish() != null) set("words.$.polish", word.getPolish());
                    if(word.getEnglish() != null) set("words.$.english", word.getEnglish());
                }},
                Unit.class,
                collectionName
        );
        
        return this.findWordByWordNumber(word.getUnitId(), word.getWordNumber());
    }

    @Override
    public Map<String, String> deleteWord(String unitId, Long wordNumber) {
        
        Unit unit = this.findUnitById(unitId);
        Word word = unit.getWords().stream().filter(w -> w.getWordNumber().equals(wordNumber)).findFirst().orElse(null);
        unit.getWords().remove(word);
        
        for (int i = 1; i < unit.getWords().size(); i++) {
            if(unit.getWords().get(i).getWordNumber() - unit.getWords().get(i-1).getWordNumber() > 1) {
                unit.getWords().get(i).setWordNumber(unit.getWords().get(i).getWordNumber() - 1);
            }
        }
        
        mongoTemplate.updateFirst(
                new Query(where("_id").is(new ObjectId(unitId))),
                new Update(){{
                    set("words", unit.getWords());
                }},
                Unit.class,
                collectionName
        );
        
        return Collections.singletonMap("state", "Slówko zostało pomyślnie usunięte");
    }
}
