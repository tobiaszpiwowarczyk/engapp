package pl.piwowarczyk.dbservice.userstatistics.repository;

import pl.piwowarczyk.dbservice.userstatistics.UserStatistics;
import pl.piwowarczyk.dbservice.userstatistics.domain.UserStatisticsInsertionEntity;

import java.util.List;

public interface UserStatisticsRepositoryCustom {
    List<UserStatistics> findAllByUsername(String username);
}
