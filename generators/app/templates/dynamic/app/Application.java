package <%= configOptions.packageName %>;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class <%= configOptions.appNameStrip %>Application {

    private static Logger logger = LoggerFactory.getLogger(<%= configOptions.appNameStrip %>Application.class);

    public static void main(String[] args){
        try{
            ConfigurableApplicationContext ac = SpringApplication.run(<%= configOptions.appNameStrip %>Application.class, args);
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                logger.info("SIGTERM issued");
                ac.close();
                logger.info("Exit");
        }
        ));
        } catch(Exception e) {
            logger.error("Error Starting spring", e);
        }
    }
}