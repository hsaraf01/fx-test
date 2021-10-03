package com.fxtest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Objects;

import static java.util.Objects.*;

@Component
public class Loader {

    @Autowired
    private RestService restService;

    @PostConstruct
    public void loadUsers() throws IOException {
        Files.lines(Paths.get(ResourceUtils.getFile("classpath:username.txt").toURI())).forEach(
                user -> restService.addUser(user)
        );

    }
}
