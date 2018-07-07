package pl.piwowarczyk.dbservice.word.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.exception.WordNotFoundException;

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
}
