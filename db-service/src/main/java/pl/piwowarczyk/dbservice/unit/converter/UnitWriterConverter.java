package pl.piwowarczyk.dbservice.unit.converter;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.core.convert.converter.Converter;
import pl.piwowarczyk.dbservice.unit.Unit;

public class UnitWriterConverter implements Converter<Unit, Document> {
    
    @Override
    public Document convert(Unit unit) {   
        return new Document(){{
            if(unit.getId() != null) put("_id", new ObjectId(unit.getId()));
            put("name", unit.getName());
            put("color", unit.getColor());
            put("published", unit.getPublished());
            put("words", unit.getWords());
        }};
    }
}
