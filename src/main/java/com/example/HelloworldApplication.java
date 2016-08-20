package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class HelloworldApplication  extends SpringBootServletInitializer {

	public static void main(String[] args) {
		SpringApplication.run(HelloworldApplication.class, args);
	}

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
    	
    	System.out.println("*****\n****\n****\nIT started\n*****\n****\n****\n");
        return application.sources(HelloworldApplication.class);
    }


}


