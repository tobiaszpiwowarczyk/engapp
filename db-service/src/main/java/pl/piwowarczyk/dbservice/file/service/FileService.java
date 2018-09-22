package pl.piwowarczyk.dbservice.file.service;

import org.springframework.web.multipart.MultipartFile;
import pl.piwowarczyk.dbservice.file.domain.AbstractFile;
import pl.piwowarczyk.dbservice.file.domain.File;

import java.io.IOException;
import java.util.List;

public interface FileService {
    List<AbstractFile> getAllFiles();
    byte[] getFile(String name) throws IOException;
    File upload(MultipartFile file, String folder) throws IOException;
}
