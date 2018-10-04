package pl.piwowarczyk.dbservice.errorreport.service;

import pl.piwowarczyk.dbservice.errorreport.ErrorReport;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportInsertionEntity;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;

import java.util.List;
import java.util.Map;

public interface ErrorReportService {
    List<ErrorReport> findAll();
    ErrorReport findById(String id);
    ErrorReport addReport(ErrorReportInsertionEntity errorReport);
    void markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity);
    Map<String, String> removeReport(String id);
}
