package pl.piwowarczyk.dbservice.repository;

public interface BaseRepositoryCustom {
    boolean existsBy(String property, String value, String collectionName);
}
