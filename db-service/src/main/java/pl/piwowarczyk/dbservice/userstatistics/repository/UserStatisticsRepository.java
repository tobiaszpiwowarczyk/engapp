package pl.piwowarczyk.dbservice.userstatistics.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.piwowarczyk.dbservice.userstatistics.UserStatistics;

@Repository
public interface UserStatisticsRepository extends MongoRepository<UserStatistics, String>, UserStatisticsRepositoryCustom {}
