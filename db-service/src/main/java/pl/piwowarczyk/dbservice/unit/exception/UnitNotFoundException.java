package pl.piwowarczyk.dbservice.unit.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        code = HttpStatus.NOT_FOUND,
        reason = "Rozdział o podanym identyfikatorze nie istnieje"
)
public class UnitNotFoundException extends RuntimeException {}
