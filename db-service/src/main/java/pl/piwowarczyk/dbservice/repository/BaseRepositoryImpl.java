package pl.piwowarczyk.dbservice.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.MongoEntityInformation;
import org.springframework.data.mongodb.repository.support.SimpleMongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@NoRepositoryBean
public class BaseRepositoryImpl<T, ID> extends SimpleMongoRepository<T, ID> implements BaseRepositoryCustom {
    
    @Autowired
    private MongoOperations mongoOperations;

    /**
     * Creates a new {@link SimpleMongoRepository} for the given {@link MongoEntityInformation} and {@link MongoTemplate}.
     *
     * @param metadata        must not be {@literal null}.
     * @param mongoOperations must not be {@literal null}.
     */
    public BaseRepositoryImpl(MongoEntityInformation<T, ID> metadata, MongoOperations mongoOperations) {
        super(metadata, mongoOperations);
        this.mongoOperations = mongoOperations;
    }


    /**
     * Check, if object with exists in database with provided objects property and value
     * 
     * @param property - objects property, mustn't be blank 
     * @param value - searched value, mustn't be null
     * @param collectionName - collection name, mustn't be blank
     * @return true if object exists, otherwise - false
     */
    @Override
    public boolean existsBy(String property, String value, String collectionName) {
        return mongoOperations.count(new Query(){{
            addCriteria(where(property).is(value));
        }}, collectionName) == 1;
    }
}
