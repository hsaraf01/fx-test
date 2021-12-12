package com.fxtest.service;

import com.fxtest.dao.QuestionStore;
import com.fxtest.dao.TitleStore;
import com.fxtest.model.Question;
import com.fxtest.model.QuestionSet;
import com.fxtest.model.Title;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.ResourceUtils;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Component
public class Loader {

    @Autowired
    private RestService restService;

    @Value("${storage.path}")
    private String storagePath;

    @Autowired
    private TitleStore titleStore;

    @Autowired
    private QuestionStore questionStore;

    @PostConstruct
    public void loadUsers() throws IOException {
        Files.lines(Paths.get(ResourceUtils.getFile("classpath:username.txt").toURI())).forEach(
                user -> restService.addUser(user)
        );
        Gson gson  = new Gson();
        Files.list(Paths.get(storagePath)).forEach(path -> {
            try {
                String questionSet = Files.readAllLines(path).get(0);
                QuestionSet qs = gson.fromJson(questionSet, QuestionSet.class);
                Title title = qs.getTitle();
                List<Question> questionList = qs.getQuestions();
                titleStore.addTitle(title);
                questionList.forEach(question -> questionStore.addQuestion(title.getId(), question));
            } catch (IOException e) {
                e.printStackTrace();
            }
        });

    }
}
