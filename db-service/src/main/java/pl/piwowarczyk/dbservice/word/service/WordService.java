package pl.piwowarczyk.dbservice.word.service;

import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;

import java.util.Map;

public interface WordService {
    Word findWordByWordNumber(String unitId, Long wordNumber);
    Word addWord(String unitId, WordCreationEntity word);
    Word editWord(String unitId, Word word);
    Map<String, String> deleteWord(String unitId, Long wordNumber);
}
