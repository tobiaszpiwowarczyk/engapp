package pl.piwowarczyk.dbservice.file.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class File implements AbstractFile {
    
    private String name;
    private String path;
    private String fileAddress;
}
