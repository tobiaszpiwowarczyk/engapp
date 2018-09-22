package pl.piwowarczyk.dbservice.file.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(
        code = HttpStatus.NOT_FOUND,
        reason = "Plik, który chcesz wyświetlić nie istnieje"
)
public class FileNotFoundException extends RuntimeException {}
