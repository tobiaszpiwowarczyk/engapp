package pl.piwowarczyk.dbservice.word.service;

import pl.piwowarczyk.dbservice.word.Word;
import pl.piwowarczyk.dbservice.word.domain.WordCreationEntity;
import pl.piwowarczyk.dbservice.word.domain.WordEditionEntity;

import java.util.Map;

public interface WordService {
    Word findWordByWordNumber(String unitId, Long wordNumber);
    Word addWord(WordCreationEntity word);
    Word editWord(WordEditionEntity word);
    Map<String, String> deleteWord(String unitId, Long wordNumber);
}
