package pl.piwowarczyk.authservice.user.service;

import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.authservice.user.domain.UserRegisterEntity;

import java.security.Principal;
import java.util.List;

public interface UserService {
    List<User> findAll();
    User findByUsername(String username);
    User addUser(UserRegisterEntity user);
    User editUser(UserEditionEntity user, Principal principal);
}
