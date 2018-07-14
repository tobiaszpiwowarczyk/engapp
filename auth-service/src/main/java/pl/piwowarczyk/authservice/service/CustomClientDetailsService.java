package pl.piwowarczyk.authservice.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.provider.ClientDetails;
import org.springframework.security.oauth2.provider.ClientDetailsService;
import org.springframework.security.oauth2.provider.ClientRegistrationException;
import org.springframework.security.oauth2.provider.client.BaseClientDetails;
import org.springframework.stereotype.Component;

import static java.util.Arrays.asList;

@Component
@AllArgsConstructor
public class CustomClientDetailsService implements ClientDetailsService {
    
    @Override
    public ClientDetails loadClientByClientId(String clientId) throws ClientRegistrationException {
        return new BaseClientDetails(){{
            setClientId("engapp-client");
            setClientSecret("engapp-secret");
            setAuthorizedGrantTypes(asList("authorization_code", "password", "refresh_token"));
            setScope(asList("read", "write"));
            setAuthorities(AuthorityUtils.createAuthorityList("ROLE_USER", "ROLE_ADMIN"));
        }};
    }
}
