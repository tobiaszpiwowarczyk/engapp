package pl.piwowarczyk.dbservice.errorreport.service;

import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.piwowarczyk.dbservice.errorreport.ErrorReport;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportInsertionEntity;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;
import pl.piwowarczyk.dbservice.errorreport.exception.ErrorReportNotFoundException;
import pl.piwowarczyk.dbservice.errorreport.repository.ErrorReportRepository;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@AllArgsConstructor
public class ErrorReportServiceImpl implements ErrorReportService {
    
    private ErrorReportRepository errorReportRepository;
    
    @Override
    public List<ErrorReport> findAll() {
        return errorReportRepository.findAllErrorReports();
    }

    @Override
    public ErrorReport findById(String id) {
        return errorReportRepository.findById(id).orElseThrow(ErrorReportNotFoundException::new);
    }

    @Override
    public ErrorReport addReport(ErrorReportInsertionEntity errorReport) {
        return errorReportRepository.save(
                ErrorReport.builder()
                        .subject(errorReport.getSubject())
                        .message(errorReport.getMessage())
                        .username(SecurityContextHolder.getContext().getAuthentication().getName())
                        .build()
        );
    }

    @Override
    public Map<String, Boolean> markReportAsRead(ErrorReportMarkAsReadEntity markAsReadEntity) {
        errorReportRepository.markReportAsRead(markAsReadEntity);
        return Collections.singletonMap("state", markAsReadEntity.getRead());
    }

    @Override
    public Map<String, String> removeReport(String id) {
        errorReportRepository.deleteById(id);
        return Collections.singletonMap("state", "Objekt został usunięty pomyślnie");
    }
}
