package com.lojaroupas.api.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping
    public String test() {
        return "API está funcionando!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
