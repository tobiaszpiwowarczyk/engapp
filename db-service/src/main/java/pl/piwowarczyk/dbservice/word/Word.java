package pl.piwowarczyk.dbservice.word;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class Word {
    
    private Long wordNumber;
    
    @NotBlank(message = "To pole jest wymagane")
    private String polish;
    
    @NotBlank(message = "To pole jest wymagane")
    private String english;
    
}
