package pl.piwowarczyk.dbservice.errorreport.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        code = HttpStatus.NOT_FOUND,
        reason = "Obiekt o podanym identyfikatorze nie został znaleziony"
)
public class ErrorReportNotFoundException extends RuntimeException {}
