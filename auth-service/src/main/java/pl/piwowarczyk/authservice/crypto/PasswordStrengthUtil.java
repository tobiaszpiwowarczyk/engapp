package pl.piwowarczyk.authservice.crypto;

import java.util.Arrays;

public class PasswordStrengthUtil {
    
    private static final String[] REG_EXS = {"(?=.*[0-9]).*", "(?=.*[a-z]).*", "(?=.*[A-Z]).*", "(?=.*[!-//:-@\\[-`{-ÿ]).*", "(?=.*.{13}).*"};
    
    /**
     * 
     * Checks password strength for input
     * 
     * @param input {@link String} - the password
     * @return int - password strength
     */
    public static int getPasswordStrength(String input) {
        return (int) Arrays.stream(REG_EXS).filter(input::matches).count();
    }
    
}
