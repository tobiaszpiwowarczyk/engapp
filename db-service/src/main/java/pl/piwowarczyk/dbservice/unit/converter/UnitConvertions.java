package pl.piwowarczyk.dbservice.unit.converter;

import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.Collections;

public class UnitConvertions {
    
    public static MongoCustomConversions getCustomConversions() {
        return new MongoCustomConversions(
                Collections.singletonList(new UnitWriterConverter())
        );
    }
    
}
