package com.example;

import java.util.Enumeration;
import java.util.Properties;

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

		String iafMod = System.getProperty("IafMOD");
		String server = "AWS Cloud!";
		if (iafMod != null) {
			server = "Deere Open Stack!";
		}

		StringBuffer sb = new StringBuffer();
		sb.append("<style>@keyframes example {from {background-color: green;}to {background-color: white;}} ");
		sb.append("a.x { ");
		sb.append("    animation-name: example; ");
		sb.append("    animation-duration: 1s; ");
		sb.append("	animation-iteration-count: 8; ");
		sb.append("} ");
		sb.append("</style> ");


		sb.append("<body style='background-color:green;'>" + "<span style='color:yellow;'> ");
		sb.append("Hello " + name);
		sb.append("<br><h1> This is as a Spring Boot application deployed to " + server + "</h1>");

		sb.append("<a class=\"x\" href=\"http://calculator.us-east-1.elasticbeanstalk.com\" target=\"_blank\">Link to calculator.</a> ");
		sb.append("<h2> System Properties...</h2>");
		sb.append(getSystemPropertiesList() + "</span>");
		
		return sb.toString();

	}

	private String getSystemPropertiesList() {

		Properties p = System.getProperties();
		Enumeration<?> keys = p.keys();
		StringBuffer b = new StringBuffer();
		b.append("<ul>");
		while (keys.hasMoreElements()) {
			String key = (String) keys.nextElement();
			String value = (String) p.get(key);
			b.append("<li>");
			b.append(key + ": " + value);
			b.append("</li>");
		}
		b.append("</ul>");

		return b.toString();
	}

}
