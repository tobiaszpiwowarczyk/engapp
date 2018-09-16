package pl.piwowarczyk.dbservice.file.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.piwowarczyk.dbservice.file.domain.AbstractFile;
import pl.piwowarczyk.dbservice.file.domain.File;
import pl.piwowarczyk.dbservice.file.utils.FileUtils;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class FileServiceImpl implements FileService {


    @Override
    public List<AbstractFile> getAllFiles() {
        return FileUtils.getFiles();
    }

    @Override
    public byte[] getFile(String name) throws IOException {
        return FileUtils.getFile(name);
    }

    @Override
    public File upload(MultipartFile file, String folder) throws IOException {
        return FileUtils.saveFile(file, folder);
    }
}
