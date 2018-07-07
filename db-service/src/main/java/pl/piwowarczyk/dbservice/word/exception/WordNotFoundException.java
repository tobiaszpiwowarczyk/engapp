package pl.piwowarczyk.dbservice.word.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        code = HttpStatus.NOT_FOUND,
        reason = "Słowo o podanym identyfikatorze nie istnieje"
)
public class WordNotFoundException extends RuntimeException {}
