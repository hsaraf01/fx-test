package com.fxtest.service;

import com.fxtest.model.QuestionSet;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class PersistentService {

    @Value("${storage.path}")
    private String storagePath;


    public void write(QuestionSet questionSet) throws IOException {
        Gson gson = new Gson();
        String content = gson.toJson(questionSet);
        String titleId = questionSet.getTitle().getId();
        Path path = Paths.get(storagePath+"/"+titleId+".json");
        Files.write(path, content.getBytes(StandardCharsets.UTF_8));
    }


}
