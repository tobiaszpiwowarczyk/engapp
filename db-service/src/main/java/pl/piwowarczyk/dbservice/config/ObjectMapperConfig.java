package pl.piwowarczyk.dbservice.config;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.piwowarczyk.dbservice.config.date.CustomLocalDateTimeDeserializer;
import pl.piwowarczyk.dbservice.config.date.CustomLocalDateTimeSerializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Configuration
@AllArgsConstructor
public class ObjectMapperConfig {

    private CustomLocalDateTimeSerializer customLocalDateTimeSerializer;
    private CustomLocalDateTimeDeserializer customLocalDateTimeDeserializer;
    
    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper(){{
            setSerializationInclusion(JsonInclude.Include.NON_NULL);
            registerModule(javaTimeModule());
            disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        }};
    }
    
    private JavaTimeModule javaTimeModule() {
        JavaTimeModule javaTimeModule = new JavaTimeModule();

        javaTimeModule.addSerializer(LocalDateTime.class, customLocalDateTimeSerializer);
        javaTimeModule.addDeserializer(LocalDateTime.class, customLocalDateTimeDeserializer);
        
        return javaTimeModule;
    }
}
