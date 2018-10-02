package pl.piwowarczyk.dbservice.config.ws;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import pl.piwowarczyk.dbservice.config.ws.CustomChannelInterceptor;

@Configuration
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@AllArgsConstructor
public class WebSocketAuthenticationConfig implements WebSocketMessageBrokerConfigurer {

    private CustomChannelInterceptor customChannelInterceptor;
    
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(customChannelInterceptor);
    }
    
}
