package pl.piwowarczyk.authservice.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pl.piwowarczyk.authservice.crypto.CustomPasswordEncoder;
import pl.piwowarczyk.authservice.user.User;
import pl.piwowarczyk.authservice.user.service.UserServiceImpl;

@Component
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    
    private UserServiceImpl userService;
    private CustomPasswordEncoder customPasswordEncoder;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User userFound = userService.findByUsername(username);

        if(userFound == null)
            throw new UsernameNotFoundException(username + " nie istnieje");

        return userFound;
    }
}
