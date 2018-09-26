package pl.piwowarczyk.dbservice.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import pl.piwowarczyk.dbservice.unit.converter.UnitWriterConverter;

import java.util.ArrayList;

@Configuration
@AllArgsConstructor
public class MongoConfig {
    
    private MongoDbFactory mongoDbFactory;
    private MongoMappingContext mongoMappingContext;
    
    private UnitWriterConverter unitWriterConverter;


    @Bean
    public MappingMongoConverter mappingMongoConverter() {
        return new MappingMongoConverter(new DefaultDbRefResolver(mongoDbFactory), mongoMappingContext){{
            setTypeMapper(new DefaultMongoTypeMapper(null));
            setCustomConversions(mongoCustomConversions());
        }};
    }
    
    private MongoCustomConversions mongoCustomConversions() {
        return new MongoCustomConversions(
                new ArrayList<Converter>(){{
                    add(unitWriterConverter);
                }}
        );
    }
}
