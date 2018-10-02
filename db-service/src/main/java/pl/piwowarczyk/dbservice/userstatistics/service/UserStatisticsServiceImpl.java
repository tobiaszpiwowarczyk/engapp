package pl.piwowarczyk.dbservice.userstatistics.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.unit.Unit;
import pl.piwowarczyk.dbservice.unit.repository.UnitRepository;
import pl.piwowarczyk.dbservice.userstatistics.UserStatistics;
import pl.piwowarczyk.dbservice.userstatistics.domain.UserStatisticsInsertionEntity;
import pl.piwowarczyk.dbservice.userstatistics.repository.UserStatisticsRepository;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class UserStatisticsServiceImpl implements UserStatisticsService {
    
    private UserStatisticsRepository userStatisticsRepository;
    private UnitRepository unitRepository;

    @Override
    public List<UserStatistics> findAll() {
        return userStatisticsRepository.findAllStats();
    }

    @Override
    public List<UserStatistics> findAllUserStats() {
        return userStatisticsRepository.findAllByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    @Override
    public UserStatistics addUserStatistics(UserStatisticsInsertionEntity userStatistics) {

        Unit unit = unitRepository.findUnitById(userStatistics.getUnitId());

        return userStatisticsRepository.save(
                UserStatistics.builder()
                        .score(userStatistics.getScore())
                        .total(userStatistics.getTotal())
                        .username(SecurityContextHolder.getContext().getAuthentication().getName())
                        .createdAt(LocalDateTime.now())
                        .unit(new HashMap<String, String>(){{
                            put("id", unit.getId());
                            put("name", unit.getName());
                            put("color", unit.getColor());
                        }})
                        .build()
        );
    }

}