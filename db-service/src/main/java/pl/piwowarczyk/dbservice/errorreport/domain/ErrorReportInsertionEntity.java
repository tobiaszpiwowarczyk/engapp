package pl.piwowarczyk.dbservice.errorreport.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorReportInsertionEntity {
    
    @NotBlank
    private String message;
}
