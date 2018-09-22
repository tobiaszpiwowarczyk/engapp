package pl.piwowarczyk.dbservice.file.utils;

import org.springframework.web.multipart.MultipartFile;
import pl.piwowarczyk.dbservice.file.domain.AbstractFile;
import pl.piwowarczyk.dbservice.file.domain.Directory;
import pl.piwowarczyk.dbservice.file.domain.DropFile;
import pl.piwowarczyk.dbservice.file.domain.File;
import pl.piwowarczyk.dbservice.file.exception.FileNotFoundException;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Arrays;
import java.util.Base64;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class FileUtils {

    private static final String DATA_FOLDER = "/home/tobiasz/Pulpit/engapp-data/";
    private static final String DATA_ADDRESS = "http://localhost:8001/api/file/";
    
    public static final String IMAGE_PREFIX = "http://localhost:8001/api/file/img/";
    public static final String DEFAULT_UNIT_IMAGE = "default-unit.jpg";
    

    /**
     * Retrieves all files from 'path'
     * 
     * @return list of {@link AbstractFile} objects
     */
    public static List<AbstractFile> getFiles() {
        return getFiles(DATA_FOLDER);
    }


    /**
     * Read file by file name and returns as byte array
     * @param name {@link String} file name
     * @return {@link byte[]} - file byte array
     */
    public static byte[] getFile(String name) throws IOException {
        
        if(!new java.io.File(DATA_FOLDER + name).exists())
            throw new FileNotFoundException();
        
        return Files.readAllBytes(new java.io.File(DATA_FOLDER + name).toPath());
    }

    /**
     * Saves file into specific directory
     * 
     * @param file {@link MultipartFile} - sent file
     * @param folder {@link String} - target folder
     * @return {@link File} object
     * @throws IOException
     */
    public static File saveFile(MultipartFile file, String folder) throws IOException {
        return saveFile(new DropFile(file.getOriginalFilename(), file.getContentType(), new String(Base64.getEncoder().encode(file.getBytes()))), folder);
    }

    /**
     * Saves file into specific directory
     *
     * @param data {@link String} - must be encoded to base64
     * @param folder {@link String} - target folder
     * @return {@link File} object
     * @throws IOException
     */
    public static File saveFile(DropFile data, String folder) throws IOException {
        if(!folder.equals("") && !folder.endsWith("/")) folder += "/";
        if(data.getData().contains("base64,"))
            data.setData(data.getData().split("base64,")[1]);

        FileOutputStream outputStream = new FileOutputStream(new java.io.File(DATA_FOLDER + folder + data.getName()));
        outputStream.write(Base64.getDecoder().decode(data.getData().getBytes()));

        return File.builder()
                .name(data.getName())
                .path(DATA_FOLDER + folder)
                .fileAddress(DATA_ADDRESS + folder + data.getName())
                .build();
    }
      

    private static List<AbstractFile> getFiles(String path) {
        return Arrays.stream(Objects.requireNonNull(new java.io.File(path).listFiles()))
                .map(file -> {
                    if(file.isDirectory()) return new Directory(FilePathUtils.getFolderName(file.getPath()), getFiles(file.getPath()));
                    else if(file.isFile())
                        return File.builder()
                                .name(file.getName())
                                .path(file.getPath())
                                .fileAddress(IMAGE_PREFIX + file.getName())
                                .build();
                    return null;
                })
                .collect(Collectors.toList());
    }
}
