package pl.piwowarczyk.authservice.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import pl.piwowarczyk.authservice.user.role.UserRole;

import java.util.Collection;

@Data
@AllArgsConstructor
@Builder
@Document(collection = "users")
// TODO: 26.07.18 Create image profile 
public class User implements UserDetails {
    
    @Id
    private String id;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;

    @Builder.Default
    private UserRole role = UserRole.USER;
    
    @Builder.Default
    @JsonIgnore
    private boolean accountNonExpired = true;

    @Builder.Default
    @JsonIgnore
    private boolean accountNonLocked = true;

    @Builder.Default
    @JsonIgnore
    private boolean credentialsNonExpired = true;

    @Builder.Default
    @JsonIgnore
    private boolean enabled = true;
    

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(this.getRole().getRoles());
    }
}
