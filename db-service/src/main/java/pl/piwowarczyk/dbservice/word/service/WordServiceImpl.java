package pl.piwowarczyk.dbservice.word.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;
import pl.piwowarczyk.dbservice.word.exception.WordNotFoundException;

import java.util.Map;

@Service
@AllArgsConstructor
public class WordServiceImpl implements WordService {
    
    private UnitRepository unitRepository;

    @Override
    public Word findWordByWordNumber(String unitId, Long wordNumber) {

        if(unitRepository.existsByWordNumber(unitId, wordNumber))
            throw new WordNotFoundException();
        
        return unitRepository.findWordByWordNumber(unitId, wordNumber);
    }

    @Override
    public Word addWord(WordCreationEntity word) {
        return unitRepository.addWord(word);
    }

    @Override
    public Word editWord(WordEditionEntity word) {
        return unitRepository.editWord(word);
    }

    @Override
    public Map<String, String> deleteWord(String unitId, Long wordNumber) {
        return unitRepository.deleteWord(unitId, wordNumber);
    }
}
