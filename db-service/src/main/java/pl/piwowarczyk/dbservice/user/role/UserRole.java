package pl.piwowarczyk.dbservice.user.role;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@AllArgsConstructor
public enum UserRole {
    USER(new String[] {"ROLE_USER"}), 
    ADMIN(new String[] {"ROLE_USER", "ROLE_ADMIN"});
    
    @Getter private String[] roles;
    
}
