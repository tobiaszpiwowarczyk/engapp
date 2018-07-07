package pl.piwowarczyk.dbservice.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import pl.piwowarczyk.dbservice.repository.BaseRepositoryImpl;

@Configuration
@EnableMongoRepositories(
        basePackages = "pl.piwowarczyk",
        repositoryBaseClass = BaseRepositoryImpl.class
)
public class RepositoryConfig {}
