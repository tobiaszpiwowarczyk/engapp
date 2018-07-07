package pl.piwowarczyk.dbservice.word.service;

import pl.piwowarczyk.dbservice.word.Word;

public interface WordService {
    Word findWordByWordNumber(String unitId, Long wordNumber);
}
