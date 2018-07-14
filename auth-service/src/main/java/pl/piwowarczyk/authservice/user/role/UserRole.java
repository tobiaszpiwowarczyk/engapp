package pl.piwowarczyk.authservice.user.role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
public enum UserRole {
    USER(new String[] {"ROLE_USER"}), 
    ADMIN(new String[] {"ROLE_USER", "ROLE_ADMIN"});
    
    @Getter private String[] roles;
    
}
