package com.fxtest.service;

import com.fxtest.dao.QuestionStore;
import com.fxtest.dao.TitleStore;
import com.fxtest.dao.UserStore;
import com.fxtest.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RestService {

    @Autowired
    private UserStore userStore;
    
    @Autowired
    private QuestionStore questionStore;

    @Autowired
    private TitleStore titleStore;

    @Autowired
    private SSEEmitterService emitterService;

    @Autowired
    private PersistentService persistentService;

    public List<User> getAllUsers() {
        return userStore.getAllUser();
    }

    public User addUser(String userName) {
        User user = new User(UUID.randomUUID().toString(), userName);
        userStore.addUser(user);
        return user;
    }

    public List<Question> getPreEvalQuestions() {
        final String activeTitle= titleStore.getActiveTitleId();
        return questionStore.getQuestionSet(activeTitle).stream()
                .map(q -> new Question(q.getId(),q.getQuestion(), q.getOptions()))
                .collect(Collectors.toList());
    }
    
    public Question addQuestion(String titleId, String question, String option1, String option2, String option3, String option4, int answer) throws IOException {
        Option o1 = new Option(getId(), option1);
        Option o2 = new Option(getId(), option2);
        Option o3 = new Option(getId(), option3);
        Option o4 = new Option(getId(), option4);
        List<Option> options = Arrays.asList(o1,o2,o3,o4);
        String answerId = options.get(answer-1).getId();
        Question q = new Question(getId(), question,options, answerId);
        List<Question> questionList = questionStore.getQuestionSet(titleId);
        questionList.add(q);
        Title title = titleStore.getTitle(titleId);
        persistentService.write(new QuestionSet(title, questionList));
        questionStore.addQuestion(titleId, q);
        return q;
    }

    public String addTitle(String title) throws IOException {
        String titleId = getId();
        Title title1 =new Title(titleId, title);
        persistentService.write(new QuestionSet(title1, Collections.emptyList()));
        titleStore.addTitle(title1);
        return titleId;
    }

    public String getTitle() {
        return titleStore.getActiveTitle();
    }

    private String getId() {
        return UUID.randomUUID().toString();
    }

    public void userLoggedIn(User user) {
        emitterService.emitUserLoggedInEvent(user);
    }

    public List<Title> getTitleList() {
        return  titleStore.getAllTitles();
    }

    public void setActiveTitle(Title title) {
        titleStore.setActiveTitle(title);
    }

    public String getActiveTitleId() {
        return titleStore.getActiveTitleId();
    }


    public void setActiveEvaluation(String evaluation) {
        titleStore.setActiveEvaluation(evaluation);
    }

    public String getActiveEvaluation() {
        return titleStore.getActiveEvaluation();
    }
}
