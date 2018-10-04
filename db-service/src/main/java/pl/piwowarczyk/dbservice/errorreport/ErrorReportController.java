package pl.piwowarczyk.dbservice.errorreport;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportInsertionEntity;
import pl.piwowarczyk.dbservice.errorreport.domain.ErrorReportMarkAsReadEntity;
import pl.piwowarczyk.dbservice.errorreport.service.ErrorReportServiceImpl;

import javax.validation.Valid;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/error-reports")
@AllArgsConstructor
public class ErrorReportController {
    
    private ErrorReportServiceImpl errorReportService;
    private SimpMessagingTemplate simpMessagingTemplate;
    
    
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<ErrorReport> findAll() {
        return errorReportService.findAll();
    }
    
    
    @GetMapping("{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ErrorReport findById(@PathVariable String id) {
        return errorReportService.findById(id);
    }
    
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> addReport(@Valid @RequestBody ErrorReportInsertionEntity errorReport) {
        ErrorReport errorReport1 = errorReportService.addReport(errorReport);
        simpMessagingTemplate.convertAndSend("/topic/error-reports", errorReport1);
        return Collections.singletonMap("state", "Błąd został wysłany pomyślnie");
    }
    
    
    @PutMapping("mark-as-read")
    public void markReportAsRead(@Valid @RequestBody ErrorReportMarkAsReadEntity markAsReadEntity) {
        errorReportService.markReportAsRead(markAsReadEntity);
    }
    
    
    @DeleteMapping("{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public Map<String, String> removeReport(@PathVariable String id) {
        return errorReportService.removeReport(id);
    } 
}
