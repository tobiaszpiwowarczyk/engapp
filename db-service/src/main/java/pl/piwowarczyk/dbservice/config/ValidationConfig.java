package pl.piwowarczyk.dbservice.config;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

@Configuration
public class ValidationConfig {
    
    @Bean
    public MessageSource messageSource() {
        return new ReloadableResourceBundleMessageSource(){{
            setBasename("classpath:messages");
            setDefaultEncoding("UTF-8");
        }};
    }
    
    
    @Bean
    public LocalValidatorFactoryBean factoryBean() {
        return new LocalValidatorFactoryBean(){{
            setValidationMessageSource(messageSource());
        }};
    }
    
    
    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor() {
        return new MethodValidationPostProcessor(){{
            setValidator(factoryBean());
        }};
    }
}
