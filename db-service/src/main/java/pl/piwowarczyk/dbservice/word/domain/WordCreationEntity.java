package pl.piwowarczyk.dbservice.word.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WordCreationEntity {
    
    @NotBlank(message = "To pole jest wymagane")
    private String polish;
    
    @NotBlank(message = "To pole jest wymagane")
    private List<String> english;
}
