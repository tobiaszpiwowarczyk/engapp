package pl.piwowarczyk.dbservice.unit.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import java.util.ArrayList;

public class UnitConvertions {
    
    public static MongoCustomConversions getCustomConversions() {
        return new MongoCustomConversions(
           new ArrayList<Converter<?,?>>(){{
               add(new UnitWriterConverter());
           }}
        );
    }
    
}
