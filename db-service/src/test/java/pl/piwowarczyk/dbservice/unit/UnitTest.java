package pl.piwowarczyk.dbservice.unit;

import org.junit.Test;

import java.util.ArrayList;

import static org.junit.Assert.*;

public class UnitTest {

    @Test
    public void createUnit_shouldReturnUnit() {
        Unit unit = new Unit("1", "Jan", "#fff", "http://localhost:8000/image.png", true, new ArrayList<>(), 10L);
        
        assertEquals(unit.getId(), "1");
        assertEquals(unit.getName(), "Jan");
        assertEquals(unit.getImage(), "http://localhost:8000/image.png");
        assertEquals(unit.getColor(), "#fff");
        assertEquals(unit.getWords().size(), 0);
        
    }
}