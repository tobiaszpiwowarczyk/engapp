package pl.piwowarczyk.dbservice.user.repository;

import pl.piwowarczyk.dbservice.user.User;
import pl.piwowarczyk.dbservice.user.domain.UserEditionEntity;

public interface UserRepositoryCustom {
    User editUser(UserEditionEntity user);
}
