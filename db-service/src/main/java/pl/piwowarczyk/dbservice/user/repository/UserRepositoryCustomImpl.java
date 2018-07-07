package pl.piwowarczyk.dbservice.user.repository;

import lombok.AllArgsConstructor;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import pl.piwowarczyk.dbservice.user.User;
import pl.piwowarczyk.dbservice.user.domain.UserEditionEntity;

@AllArgsConstructor
public class UserRepositoryCustomImpl implements UserRepositoryCustom {
    
    private MongoOperations mongoOperations;

    @Override
    public User editUser(UserEditionEntity user) {
        mongoOperations.updateFirst(
                new Query().addCriteria(Criteria.where("_id").is(user.getId())),
                new Update() {{
                    if(user.getUsername() != null) set("username", user.getUsername());
                    if(user.getPassword() != null) set("password", user.getPassword());
                    if(user.getFirstName() != null) set("firstName", user.getFirstName());
                    if(user.getLastName() != null) set("lastName", user.getLastName());
                    if(user.getEmail() != null) set("email", user.getEmail());
                }},
                User.class,
                "users"
        );
        
        return mongoOperations.findById(user.getId(), User.class, "users");
    }
}
