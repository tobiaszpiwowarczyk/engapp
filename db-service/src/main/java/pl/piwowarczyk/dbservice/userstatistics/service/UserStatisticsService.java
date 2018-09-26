package pl.piwowarczyk.dbservice.userstatistics.service;

import pl.piwowarczyk.dbservice.userstatistics.UserStatistics;
import pl.piwowarczyk.dbservice.userstatistics.domain.UserStatisticsInsertionEntity;

import java.util.List;

public interface UserStatisticsService {
    List<UserStatistics> findAll();
    List<UserStatistics> findAllUserStats();
    UserStatistics addUserStatistics(UserStatisticsInsertionEntity userStatistics);
}
