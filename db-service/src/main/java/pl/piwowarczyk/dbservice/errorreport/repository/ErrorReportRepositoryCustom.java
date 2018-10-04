package pl.piwowarczyk.dbservice.errorreport.repository;

import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;

import java.util.List;

public interface ErrorReportRepositoryCustom {
    void markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity);
}
