package pl.piwowarczyk.dbservice.userstatistics;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.piwowarczyk.dbservice.userstatistics.domain.UserStatisticsInsertionEntity;
import pl.piwowarczyk.dbservice.userstatistics.service.UserStatisticsServiceImpl;

import java.util.List;

@RestController
@RequestMapping("api/user/statistics")
@AllArgsConstructor
public class UserStatisticsController {
    
    private UserStatisticsServiceImpl userStatisticsService;
    
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<UserStatistics> findAll() {
        return userStatisticsService.findAll();
    }
    
    
    @GetMapping("main")
    public List<UserStatistics> findAllUserStats() {
        return userStatisticsService.findAllUserStats();
    }
    
    
    @PostMapping
    public UserStatistics addUserStatistics(@RequestBody UserStatisticsInsertionEntity userStatistics) {
        return userStatisticsService.addUserStatistics(userStatistics);
    }
}
