package pl.piwowarczyk.dbservice.userstatistics.repository;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import pl.piwowarczyk.dbservice.userstatistics.UserStatistics;
import pl.piwowarczyk.dbservice.userstatistics.domain.UserStatisticsInsertionEntity;

import java.util.List;

import static org.springframework.data.mongodb.core.query.Criteria.where;

@AllArgsConstructor
public class UserStatisticsRepositoryImpl implements UserStatisticsRepositoryCustom {
    
    private MongoOperations mongoOperations;

    @Override
    public List<UserStatistics> findAllStats() {
        return mongoOperations.find(new Query().with(new Sort(Sort.Direction.DESC, "createdAt")), UserStatistics.class);
    }

    @Override
    public List<UserStatistics> findAllByUsername(String username) {
        return mongoOperations.find(
                new Query(where("username").is(username)).with(new Sort(Sort.Direction.DESC, "createdAt")),
                UserStatistics.class
        );
    }
}
