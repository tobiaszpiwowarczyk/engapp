package pl.piwowarczyk.dbservice.unit.repository;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static java.util.Collections.singletonList;
import static java.util.Collections.singletonMap;
import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@DataMongoTest
@RunWith(SpringRunner.class)
public class UnitRepositoryImplTest {

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
    private UnitRepositoryImpl unitRepository;

    

    @Test
    public void findAllUnits_shouldReturnListOfUnits() {
        when(unitRepository.findAllUnits())
                .thenReturn(mockUnits);

        List<Unit> allUnits = unitRepository.findAllUnits();
        
        assertArrayEquals(allUnits.toArray(), mockUnits.toArray());
        assertEquals(allUnits.size(), 2);
        assertEquals(allUnits.iterator().next().getId(), "id1");

    }

    
    @Test
    public void findById_shouldReturnUnit() {
        when(unitRepository.findUnitById(anyString())).thenReturn(mockUnits.get(0));

        Unit unit = unitRepository.findUnitById("id1");
        
        assertNotNull(unit);
        assertEquals(unit.getId(), "id1");
        assertEquals(unit.getName(), "Unit1");
        assertEquals(unit.getImage(), "image1.png");
        assertEquals(unit.getWords(), new ArrayList<>());
        assertEquals(unit.getWordsCount(), new Long("0"));

    }


    @Test
    public void findById_shouldReturnNull() {
        when(unitRepository.findUnitById(anyString())).thenReturn(null);

        Unit unit = unitRepository.findUnitById("id1");

        assertNull(unit);
    }


    @Test
    public void editUnit_shouldReturnModifiedUnit() {
        when(unitRepository.editUnit(any(UnitEditionEntity.class))).thenReturn(
                Unit.builder().id("id1").name("Modified name").image("image1.png")
                        .color("#fff").published(true)
                        .published(true).build()
        );

        Unit unit = unitRepository.editUnit(UnitEditionEntity.builder()
                .id("id1").name("Modified name").published(true).color("#fff").image("image1.png").build());
        
        assertNotNull(unit);
        assertEquals(unit.getId(), "id1");
        assertEquals(unit.getName(), "Modified name");
        assertEquals(unit.getPublished(), true);
    }

    
    @Test
    public void findWordByWordNumber_shouldReturnWord() {
        when(unitRepository.findWordByWordNumber(anyString(), anyLong())).thenReturn(
                new Word(1L, "słowo", singletonList("word"))
        );
        
        Word word = unitRepository.findWordByWordNumber("id1", 1L);
        
        assertNotNull(word);
        assertEquals(word.getPolish(), "słowo");
        assertEquals(word.getEnglish().size(), 1);
        assertEquals(word.getEnglish(), singletonList("word"));
        
        verify(unitRepository, times(1)).findWordByWordNumber(anyString(), anyLong());
    }


    @Test
    public void findWordByWordNumber_shouldReturnNull() {
        when(unitRepository.findWordByWordNumber(anyString(), anyLong())).thenReturn(null);

        Word word = unitRepository.findWordByWordNumber("id1", 1L);
        
        assertNull(word);
        verify(unitRepository, times(1)).findWordByWordNumber(anyString(), anyLong());
    }


    @Test
    public void wordExistsByWordNumber_shouldReturnTrue() {
        when(unitRepository.wordExistsByWordNumber(anyString(), anyLong())).thenReturn(true);
        
        assertTrue(unitRepository.wordExistsByWordNumber("id1", 1L));
        verify(unitRepository, times(1)).wordExistsByWordNumber(anyString(), anyLong());
        
    }


    @Test
    public void wordExistsByWordNumber_shouldReturnFalse() {
        when(unitRepository.wordExistsByWordNumber(anyString(), anyLong())).thenReturn(false);
        
        assertFalse(unitRepository.wordExistsByWordNumber("id1", 1L));
        verify(unitRepository, times(1)).wordExistsByWordNumber(anyString(), anyLong());
        
    }


    @Test
    public void existsBy_shouldReturnTrue() {
        when(unitRepository.existsBy(anyString(), any())).thenReturn(true);
        
        assertTrue(unitRepository.existsBy("name", "Unit1"));
        verify(unitRepository, times(1)).existsBy(anyString(), any());
        
    }

    
    @Test
    public void existsBy_shouldReturnFalse() {
        when(unitRepository.existsBy(anyString(), any())).thenReturn(false);

        assertFalse(unitRepository.existsBy("name", "Unit1"));
        verify(unitRepository, times(1)).existsBy(anyString(), any());

    }


    @Test
    public void wordExistsBy_shouldReturnTrue() {

        Mockito.when(unitRepository.wordExistsBy(anyString(), anyString(), any())).thenReturn(true);
        
        assertTrue(unitRepository.wordExistsBy("id1", "id", 1L));
        assertTrue(unitRepository.wordExistsBy("id1", "polish", "słowo"));

        verify(unitRepository, times(2)).wordExistsBy(anyString(), anyString(), any());
        
    }


    @Test
    public void wordExistsBy_shouldReturnFalse() {

        Mockito.when(unitRepository.wordExistsBy(anyString(), anyString(), any())).thenReturn(false);

        assertFalse(unitRepository.wordExistsBy("id1", "id", 1L));
        assertFalse(unitRepository.wordExistsBy("id1", "polish", "słowo"));

        verify(unitRepository, times(2)).wordExistsBy(anyString(), anyString(), any());
        verifyNoMoreInteractions(unitRepository);

    }


    @Test
    public void addWord_shouldReturnCreatedWord() {
        when(unitRepository.addWord(any(WordCreationEntity.class))).thenReturn(
                Word.builder()
                        .wordNumber(1L).polish("słowo").english(singletonList("word")).build()
        );

        Word word = unitRepository.addWord(new WordCreationEntity("id1", "słowo", singletonList("word")));

        assertNotNull(word);
        assertEquals(word.getWordNumber(), Long.valueOf(1L));
        assertEquals(word.getPolish(), "słowo");
        assertEquals(word.getEnglish().size(), 1);
        assertArrayEquals(word.getEnglish().toArray(), new String[] {"word"});
        
        verify(unitRepository, times(1)).addWord(any(WordCreationEntity.class));
        verifyNoMoreInteractions(unitRepository);
    }


    @Test
    public void editWord_shouldReturnModifiedWord() {
        Mockito.when(unitRepository.editWord(any(WordEditionEntity.class))).thenReturn(
                Word.builder()
                        .wordNumber(1L).polish("zmodyfikowane słowo").english(singletonList("modified word")).build()
        );

        Word word = unitRepository.editWord(new WordEditionEntity("id1", 1L, "zmodyfokowane słowo", singletonList("modified word")));
        
        assertNotNull(word);
        assertEquals(word.getWordNumber(), Long.valueOf(1L));
        assertEquals(word.getPolish(), "zmodyfikowane słowo");
        assertEquals(word.getEnglish().size(), 1);
        assertArrayEquals(word.getEnglish().toArray(), singletonList("modified word").toArray());
        
        verify(unitRepository, times(1)).editWord(any(WordEditionEntity.class));
        verifyNoMoreInteractions(unitRepository);
    }


    @Test
    public void deleteWord_shouldDeleteUnitAndReturnState() {
        when(unitRepository.deleteWord(anyString(), anyLong())).thenReturn(
                singletonMap("state", "Wiadomość została usunięta pomyślnie")
        );

        Map<String, String> deleteState = unitRepository.deleteWord("id1", 1L);
        
        assertNotNull(deleteState);
        assertEquals(deleteState.size(), 1);
        assertFalse(deleteState.isEmpty());
        assertEquals(deleteState.get("state"), "Wiadomość została usunięta pomyślnie");

        verify(unitRepository, times(1)).deleteWord(anyString(), anyLong());
        verifyNoMoreInteractions(unitRepository);
    }
}