package pl.piwowarczyk.dbservice.userstatistics.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.piwowarczyk.dbservice.unit.domain.UnitEditionEntity;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStatisticsInsertionEntity {

    private Long score;
    private Long total;
    private String unitId;
    
}
