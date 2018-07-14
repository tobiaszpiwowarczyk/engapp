package pl.piwowarczyk.library.util;

import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserPermissions {
    
    public static boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                .containsAll(AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN"));
    }
    
}
