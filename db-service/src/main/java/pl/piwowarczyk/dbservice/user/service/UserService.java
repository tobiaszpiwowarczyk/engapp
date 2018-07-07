package pl.piwowarczyk.dbservice.user.service;

import pl.piwowarczyk.dbservice.user.User;
import pl.piwowarczyk.dbservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.dbservice.user.domain.UserRegisterEntity;

import java.util.List;

public interface UserService {
    List<User> findAll();
    User findByUsername(String username);
    User addUser(UserRegisterEntity user);
    User editUser(UserEditionEntity user);
}
