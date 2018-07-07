package pl.piwowarczyk.dbservice.user.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.user.User;
import pl.piwowarczyk.dbservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.dbservice.user.domain.UserRegisterEntity;
import pl.piwowarczyk.dbservice.user.repository.UserRepository;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    
    @Override
    public User addUser(UserRegisterEntity user) {
        return userRepository.save(
                User.builder()
                        .username(user.getUsername())
                        .password(user.getPassword())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .build()
        );
    }
    
    @Override
    public User editUser(UserEditionEntity user) {
        return userRepository.editUser(user);
    }
}