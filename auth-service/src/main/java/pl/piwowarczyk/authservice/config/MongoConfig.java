package pl.piwowarczyk.authservice.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

@Configuration
@AllArgsConstructor
public class MongoConfig {
    
    private MongoDbFactory mongoDbFactory;
    private MongoMappingContext mongoMappingContext;
    
    @Bean
    public MappingMongoConverter mappingMongoConverter() {
        return new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), mongoMappingContext){{
            setTypeMapper(new DefaultMongoTypeMapper(null));
        }};
    }
    
}
