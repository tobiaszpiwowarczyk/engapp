package pl.piwowarczyk.dbservice.errorreport.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.piwowarczyk.dbservice.unit.validator.CorrectBoolean;
import pl.piwowarczyk.dbservice.validator.CorrectId;

import javax.validation.constraints.NotEmpty;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorReportMarkAsReadEntity {
    
    @NotEmpty
    private List<@CorrectId String> reportIds;
    
    @NotEmpty
    @CorrectBoolean
    private Boolean read;
    
}
