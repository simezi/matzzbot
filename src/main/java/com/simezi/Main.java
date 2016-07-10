package com.simezi;

/**
 * Created by 9simezi on 2016/07/02.
 */

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@EnableAutoConfiguration
public class Main {

    @RequestMapping("/")
    @ResponseBody
    String helloWorld() {
        return "Hello,World? kazuho";
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class);
    }

}

