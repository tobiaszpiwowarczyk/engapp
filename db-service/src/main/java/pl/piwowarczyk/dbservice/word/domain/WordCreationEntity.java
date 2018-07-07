package pl.piwowarczyk.dbservice.word.domain;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class WordCreationEntity {
    
    @NotBlank(message = "To pole jest wymagane")
    private String english;
    
    @NotBlank(message = "To pole jest wymagane")
    private String polish;
}
