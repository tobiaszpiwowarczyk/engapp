package pl.piwowarczyk.dbservice.file.utils;

import org.springframework.util.AntPathMatcher;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;

public class FilePathUtils {

    /**
     * Returns path from request
     *
     * @param base {@link String} - base folder name
     * @param request {@link HttpServletRequest} - request
     * @return {@link String} - parsed folder path
     */
    public static String getFilePathFromRequest(String base, HttpServletRequest request) {
        final String path =
                request.getAttribute(HandlerMapping.PATH_WITHIN_HANDLER_MAPPING_ATTRIBUTE).toString();
        final String bestMatchingPattern =
                request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE).toString();

        String arguments = new AntPathMatcher().extractPathWithinPattern(bestMatchingPattern, path);

        return !arguments.isEmpty() ? base + "/" +arguments : base;
    }

    /**
     * Method for obtaining folder name
     * 
     * For example:
     * - for input: "/path/to/folder" output should be: "folder"
     * - for input: "/another/example/" output should be: "example"
     * 
     * @param path {@link String} path
     * @return {@link String} folder name
     */
    public static String getFolderName(String path) {
        
        if(path.endsWith("/")) path = path.substring(0, path.length() - 1);
        
        return path.split("/")[path.split("/").length - 1];
    }
    
}
