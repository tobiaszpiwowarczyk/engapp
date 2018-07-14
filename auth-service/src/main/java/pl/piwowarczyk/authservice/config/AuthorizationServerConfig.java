package pl.piwowarczyk.authservice.config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.InMemoryTokenStore;
import pl.piwowarczyk.authservice.crypto.DefaultPasswordEncoder;
import pl.piwowarczyk.authservice.service.CustomClientDetailsService;

@Configuration
@EnableAuthorizationServer
@AllArgsConstructor
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {

    @Qualifier("authenticationManagerBean")
    private AuthenticationManager authenticationManager;
    private CustomClientDetailsService customClientDetailsService;
    private DefaultPasswordEncoder defaultPasswordEncoder;


    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.withClientDetails(customClientDetailsService);
    }


    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
        endpoints
                .tokenStore(tokenStore())
                .authenticationManager(authenticationManager);
    }

    
    @Override
    public void configure(AuthorizationServerSecurityConfigurer security) throws Exception {
        security.tokenKeyAccess("permitAll()")
                .checkTokenAccess("authenticated()")
                .passwordEncoder(defaultPasswordEncoder)
                .allowFormAuthenticationForClients();
    }

    @Bean
    public TokenStore tokenStore() {
        return new InMemoryTokenStore();
    }
}
