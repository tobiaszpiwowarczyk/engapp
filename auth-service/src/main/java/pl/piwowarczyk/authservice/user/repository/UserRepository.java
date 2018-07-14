package pl.piwowarczyk.authservice.user.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.piwowarczyk.authservice.user.User;

import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String>, UserRepositoryCustom {
    List<User> findAll();
    
    User findByUsername(String username);
}
