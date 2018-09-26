package pl.piwowarczyk.dbservice.userstatistics;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "user_statistics")
public class UserStatistics {
    
    private String id;
    private Long score;
    private Long total;
    private LocalDateTime createdAt;
    private String username;
    private Map<String, String> unit;
    
}
