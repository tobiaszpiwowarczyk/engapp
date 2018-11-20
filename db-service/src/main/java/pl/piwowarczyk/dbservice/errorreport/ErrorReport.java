package pl.piwowarczyk.dbservice.errorreport;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "error_reports")
public class ErrorReport {
    
    @Id
    private String id;
    private String subject;
    private String message;
    private String username;
    
    @Builder.Default
    private Boolean read = false;
    
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();
    
}
