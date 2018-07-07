package pl.piwowarczyk.dbservice.util;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class PasswordStrengthUtilTest {

    @Test
    public void getPasswordStrength_shouldReturnOne() {
        String input = "aaaa";
        int output = 1;
        
        int actual = PasswordStrengthUtil.getPasswordStrength(input);

        assertThat(actual).isEqualTo(output);
    }

    @Test
    public void getPasswordStrength_shouldReturnTwo() {
        String input = "Aaaa";
        int output = 2;
        
        int actual = PasswordStrengthUtil.getPasswordStrength(input);
        
        assertThat(actual).isEqualTo(output);
    }

    @Test
    public void getPasswordStrength_shouldReturnZero() {
        String input = "";
        int output = 0;
        
        int actual = PasswordStrengthUtil.getPasswordStrength(input);
        
        assertThat(actual).isEqualTo(output);
    }
}