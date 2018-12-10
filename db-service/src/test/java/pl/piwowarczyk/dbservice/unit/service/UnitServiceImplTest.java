package pl.piwowarczyk.dbservice.unit.service;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

@DataMongoTest
@RunWith(SpringRunner.class)
public class UnitServiceImplTest {

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
    private UnitServiceImpl unitService;

    @Mock
    private UnitRepository unitRepository;


    
    
    @Test
    public void findAll_shouldReturnListOfUnits() {
        when(unitService.findAll()).thenReturn(mockUnits);

        List<Unit> units = unitService.findAll();
        
        assertNotNull(units);
        assertEquals(units.size(), 2);
        assertEquals(units.iterator().next().getId(), "id1");
        assertEquals(units.iterator().next().getName(), "Unit1");
        
        verify(unitService, times(1)).findAll();
        verifyNoMoreInteractions(unitService);
    }


    @Test
    public void findById_shouldReturnUnit() {
        when(unitService.findById(anyString())).thenReturn(mockUnits.get(0));

        Unit unit = unitService.findById("id1");
        
        assertNotNull(unit);
        assertEquals(unit.getId(), "id1");
        assertEquals(unit.getName(), "Unit1");
        assertEquals(unit.getWordsCount(), Long.valueOf(0L));
        
        verify(unitService, times(1)).findById(anyString());
        verifyNoMoreInteractions(unitService);

    }


    @Test
    public void findById_shouldReturnNull() {
        when(unitService.findById(anyString())).thenReturn(null);
        
        assertNull(unitService.findById("id1"));

        verify(unitService, times(1)).findById(anyString());
        verifyNoMoreInteractions(unitService);
    }
}