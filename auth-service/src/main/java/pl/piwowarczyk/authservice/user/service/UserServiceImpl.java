package pl.piwowarczyk.authservice.user.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.authservice.crypto.CustomPasswordEncoder;
import pl.piwowarczyk.authservice.exception.UserPermissionException;
import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.domain.UserEditionEntity;
import pl.piwowarczyk.authservice.user.domain.UserRegisterEntity;
import pl.piwowarczyk.authservice.user.repository.UserRepository;

import java.security.Principal;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private CustomPasswordEncoder customPasswordEncoder;

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
                        .password(customPasswordEncoder.encode(user.getPassword()))
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .build()
        );
    }
    
    @Override
    public User editUser(UserEditionEntity user, Principal principal) {
        if(!user.getUsername().equals(principal.getName()))
            throw new UserPermissionException();
        
        return userRepository.editUser(user);
    }
}