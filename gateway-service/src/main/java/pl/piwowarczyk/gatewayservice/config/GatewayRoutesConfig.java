package pl.piwowarczyk.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayRoutesConfig {

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
                        .filters(x -> x.rewritePath("/auth/(?<route>.*)", "/api/${route}"))
                        .uri("lb://auth-service")
                )
                //login route
                .route("login", r -> r
                        .path("/login")
                        .uri("http://localhost:8002/oauth/token")
                )
                //register route
                .route("register", r -> r
                        .path("/register")
                        .uri("http://localhost:8002/api/user/")
                )
                .build();
    }
}
