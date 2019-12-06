package com.tainan.testescc4;

import com.tainan.testescc4.properties.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        FileStorageProperties.class
})
public class TesteScc4Application {

    public static void main(String[] args) {
        SpringApplication.run(TesteScc4Application.class, args);
    }

}
