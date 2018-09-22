package pl.piwowarczyk.dbservice.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DropFile {
    private String name;
    private String type;
    private String data;
}
