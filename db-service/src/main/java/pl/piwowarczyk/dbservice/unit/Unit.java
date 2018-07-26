package pl.piwowarczyk.dbservice.unit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.piwowarczyk.dbservice.word.Word;

import java.util.ArrayList;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "units")
// TODO: 26.07.18 Create image background 
public class Unit {

    @Id
    @Builder.Default
    private String id = null;

    private String name;
    private String color;

    @Builder.Default
    private Boolean published = false;

    @Builder.Default
    private ArrayList<Word> words = new ArrayList<>();

    @Builder.Default
    private Long wordsCount = 0L;
}
