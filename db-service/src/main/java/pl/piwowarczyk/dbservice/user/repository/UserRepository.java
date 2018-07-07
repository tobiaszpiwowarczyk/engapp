package pl.piwowarczyk.dbservice.user.repository;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Repository;
import pl.piwowarczyk.dbservice.repository.BaseRepository;
import pl.piwowarczyk.dbservice.user.User;

import javax.validation.constraints.NotNull;
import java.util.List;

@Repository
public interface UserRepository extends BaseRepository<User, String>, UserRepositoryCustom {
    @NotNull List<User> findAll();

    @Nullable
    User findByUsername(String username);
}
