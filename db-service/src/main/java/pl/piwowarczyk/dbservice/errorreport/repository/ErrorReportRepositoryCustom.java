package pl.piwowarczyk.dbservice.errorreport.repository;

import pl.piwowarczyk.dbservice.errorreport.ErrorReport;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;

import java.util.List;

public interface ErrorReportRepositoryCustom {
    List<ErrorReport> findAllErrorReports();
    void markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity);
}
