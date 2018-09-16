package pl.piwowarczyk.dbservice.file;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.HandlerMapping;
import pl.piwowarczyk.dbservice.file.domain.AbstractFile;
import pl.piwowarczyk.dbservice.file.domain.File;
import pl.piwowarczyk.dbservice.file.service.FileServiceImpl;
import pl.piwowarczyk.dbservice.file.utils.FilePathUtils;
import pl.piwowarczyk.dbservice.file.utils.FileUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/file")
@AllArgsConstructor
public class FileController {
    
    private FileServiceImpl fileService;


    /**
     * 
     * Retrieves all files from engapp-data directory
     * 
     * @return list if {@link AbstractFile} objects
     */
    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<AbstractFile> getFiles() {
        return fileService.getAllFiles();
    }


    /**
     * 
     * Views file by its image
     * 
     * @param image {@link String} - file image with extension
     * @return byte array as image
     * @throws IOException
     */
    @GetMapping(
            value = "{image}/**",
            produces = {
                    MediaType.IMAGE_PNG_VALUE,
                    MediaType.IMAGE_JPEG_VALUE
            }
    )
    public byte[] getFile(@PathVariable String image, HttpServletRequest request) throws IOException {
        return FileUtils.getFile(FilePathUtils.getFilePathFromRequest(image, request));
    }
    

    /**
     *
     * Method for file uploading
     * 
     * @param file {@link MultipartFile} - the file
     * @return - {@link File} - file data
     * @throws IOException
     */
    @PostMapping(
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_UTF8_VALUE
    )
    @ResponseStatus(HttpStatus.CREATED)
    public File uploadFile(
            @RequestParam MultipartFile file, 
            @RequestParam(required = false, defaultValue = "") String folder
    ) throws IOException {
        return fileService.upload(file, folder);
    }
    
    
}
