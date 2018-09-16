package pl.piwowarczyk.dbservice.word.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.exception.WordNotFoundException;

import java.util.Map;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService {
    
    private UnitRepository unitRepository;

    @Override
    public Word findWordByWordNumber(String unitId, Long wordNumber) {

        if(!unitRepository.existsByWordNumber(unitId, wordNumber))
            throw new WordNotFoundException();
        
        return unitRepository.findWordByWordNumber(unitId, wordNumber);
    }

    @Override
    public Word addWord(String unitId, WordCreationEntity word) {
        return unitRepository.addWord(unitId, word);
    }

    @Override
    public Word editWord(String unitId, Word word) {

        if(!unitRepository.existsByWordNumber(unitId, word.getWordNumber()))
            throw new WordNotFoundException();
        
        return unitRepository.editWord(unitId, word);
    }

    @Override
    public Map<String, String> deleteWord(String unitId, Long wordNumber) {
        return unitRepository.deleteWord(unitId, wordNumber);
    }
}
