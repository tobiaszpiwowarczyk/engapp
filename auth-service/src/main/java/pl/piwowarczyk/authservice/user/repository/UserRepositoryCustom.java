package pl.piwowarczyk.authservice.user.repository;

import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;

public interface UserRepositoryCustom {
    User editUser(UserEditionEntity user);
    boolean existsBy(String field, Object value);
}
