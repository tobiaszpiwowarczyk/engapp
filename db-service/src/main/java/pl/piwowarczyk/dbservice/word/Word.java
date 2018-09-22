package pl.piwowarczyk.dbservice.word;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Word {
    
    private Long wordNumber;
    private String polish;
    private List<String> english;
    
}
