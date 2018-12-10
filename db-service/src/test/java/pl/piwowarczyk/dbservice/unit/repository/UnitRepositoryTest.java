package pl.piwowarczyk.dbservice.unit.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import pl.piwowarczyk.dbservice.unit.Unit;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@DataMongoTest
@RunWith(SpringRunner.class)
public class UnitRepositoryTest {
    
    private List<Unit> mockUnits = new ArrayList<Unit>() {{
        add(Unit.builder()
                .id("id1").name("Unit1").color("#fff").words(new ArrayList<>())
                .published(true).image("image1.png").build());

        add(Unit.builder()
                .id("id2").name("Unit2").color("#fff").words(new ArrayList<>())
                .published(true).image("image2.png")
                .build());
    }};

    @MockBean
    private UnitRepository unitRepository;

    
    
    
    @Test
    public void findAll_shouldReturnListOfUnits() {
        when(unitRepository.findAllUnits())
                .thenReturn(mockUnits);


        List<Unit> units = unitRepository.findAllUnits();

        assertEquals(units.size(), 2);
        assertEquals(units.iterator().next().getId(), "id1");
        assertEquals(units.iterator().next().getName(), "Unit1");

        verify(unitRepository, times(1)).findAllUnits();
        verifyNoMoreInteractions(unitRepository);
    }

    
    @Test
    public void findById_shouldReturnUnit() {
        when(unitRepository.findUnitById(anyString()))
                .thenReturn(mockUnits.get(0));
        
        Unit unit = unitRepository.findUnitById("id1");
        
        assertNotNull(unit);
        assertEquals(unit.getId(), "id1");
        assertEquals(unit.getName(), "Unit1");

        verify(unitRepository, times(1)).findUnitById(anyString());
        verifyNoMoreInteractions(unitRepository);
    }

    
    @Test
    public void findById_shouldReturnNull() {
        when(unitRepository.findUnitById(anyString())).thenReturn(null);
        
        Unit unit = unitRepository.findUnitById("id1");
        
        assertNull(unit);
        verify(unitRepository, times(1)).findUnitById(anyString());
        verifyNoMoreInteractions(unitRepository);
    }


    @Test
    public void addUnit_shouldReturnCreatedUnit() {
        when(unitRepository.save(any(Unit.class)))
            .thenReturn(mockUnits.get(0));

        Unit unit = unitRepository.save(Unit.builder().name("Unit1").color("#fff").build());
        
        assertNotNull(unit);
        assertNotNull(unit.getId());
        assertEquals(unit.getId(), mockUnits.get(0).getId());
        assertEquals(unit.getName(), mockUnits.get(0).getName());
        assertEquals(unit.getColor(), mockUnits.get(0).getColor());
        
        verify(unitRepository, times(1)).save(any(Unit.class));
        verifyNoMoreInteractions(unitRepository);
    }
}