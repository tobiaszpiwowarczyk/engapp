package pl.piwowarczyk.gatewayservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.PredicateSpec;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

    @Value("${AUTH_SERVICE_URL:http://localhost:8002/}")
    private String authServiceUrl;
    
    @Bean
    public RouteLocator gatewayRoutes(RouteLocatorBuilder builder) {
        return builder.routes()
                // db-service route
                .route("db-service", r -> r
                        .path("/db/**")
                        .filters(x -> x.stripPrefix(1))
                        .uri("lb://db-service")
                )
                //auth-service routes
                .route("auth-service", r -> r
                        .path("/auth/**")
                        .filters(x -> x.stripPrefix(1))
                        .uri("lb://auth-service")
                )
                //login route
                .route("login", r -> r
                        .path("/login")
                        .uri(authServiceUrl+ "oauth/token")
                )
                //register route
                .route("register", r -> r
                        .path("/register")
                        .uri(authServiceUrl+ "api/user/")
                )
                .build();
    }
}
