package pl.piwowarczyk.authservice.user.repository;

import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
public class UserRepositoryImpl implements UserRepositoryCustom {

    private final String collectionName = "users";
    private MongoTemplate mongoTemplate;

    @Override
    public User editUser(UserEditionEntity user) {
        mongoTemplate.updateFirst(
                new Query().addCriteria(where("_id").is(new ObjectId(user.getId()))),
                new Update() {{
                    if(user.getUsername() != null) set("username", user.getUsername());
                    if(user.getPassword() != null) set("password", user.getPassword());
                    if(user.getFirstName() != null) set("firstName", user.getFirstName());
                    if(user.getLastName() != null) set("lastName", user.getLastName());
                    if(user.getEmail() != null) set("email", user.getEmail());
                }},
                User.class,
                collectionName
        );
        
        return mongoTemplate.findById(user.getId(), User.class, collectionName);
    }

    @Override
    public boolean existsBy(String field, Object value) {
        return mongoTemplate.count(new Query().addCriteria(where(field).is(value)), collectionName) == 1;
    }
}
