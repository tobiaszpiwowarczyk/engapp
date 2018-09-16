package pl.piwowarczyk.dbservice.file.utils;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
public class FilePathUtilsTest {

    @Test
    public void getFolderPath_shouldReturnFolderName_1() {
        String input = "/path/to/folder";
        String expected = "folder";

        Assert.assertEquals(expected, FilePathUtils.getFolderName(input));
    }

    @Test
    public void getFolderPath_shouldReturnFolderName_2() {
        String input = "/another/example/";
        String expected = "example";

        Assert.assertEquals(expected, FilePathUtils.getFolderName(input));
    }
}