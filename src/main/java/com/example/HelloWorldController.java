package com.example;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

	Log log = LogFactory.getLog(this.getClass());

	@RequestMapping("/")
	public String greeting(@RequestParam(value = "name", defaultValue = "World") String name) {

		log.info("Saying hello to " + (name == null ? "World" : name));
		return " Hello " + name;
	}
}
