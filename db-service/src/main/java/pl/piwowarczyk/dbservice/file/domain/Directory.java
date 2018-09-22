package pl.piwowarczyk.dbservice.file.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Directory implements AbstractFile {
    
    private String name;
    private List<AbstractFile> files;
    
}
