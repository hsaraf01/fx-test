package com.fxtest.service;

import com.fxtest.dao.QuestionStore;
import com.fxtest.dao.UserStore;
import com.fxtest.model.Option;
import com.fxtest.model.Question;
import com.fxtest.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class RestService {

    @Autowired
    private UserStore userStore;
    
    @Autowired
    private QuestionStore questionStore;

    public List<User> getAllUsers() {
        return userStore.getAllUser();
    }

    public User addUser(String userName) {
        User user = new User(UUID.randomUUID().toString(), userName);
        userStore.addUser(user);
        return user;
    }

    public List<Question> getPreEvalQuestions() {
        return questionStore.getAllQuestion().stream()
                .map(q -> new Question(q.getId(),q.getQuestion(), q.getOptions()))
                .collect(Collectors.toList());
    }
    
    public Question addQuestion(String question, String option1, String option2, String option3, String option4, int answer) {
        Option o1 = new Option(getId(), option1);
        Option o2 = new Option(getId(), option2);
        Option o3 = new Option(getId(), option3);
        Option o4 = new Option(getId(), option4);
        List<Option> options = Arrays.asList(o1,o2,o3,o4);
        String answerId = options.get(answer-1).getId();
        Question q = new Question(getId(), question,options, answerId);
        questionStore.addQuestion(q);
        return q;
    }

    public void addTitle(String title) {
        questionStore.addTitle(title);
    }

    public String getTitle() {
        return questionStore.getTitle();
    }

    private String getId() {
        return UUID.randomUUID().toString();
    }
}
