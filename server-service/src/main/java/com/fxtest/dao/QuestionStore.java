package com.fxtest.dao;

import com.fxtest.model.Question;
import com.fxtest.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class QuestionStore {

    private List<Question> questionList = new ArrayList<>();
    private String title;

    public void addQuestion(Question question) {
        questionList.add(question);
    }

    public List<Question> getAllQuestion() {
        return new ArrayList<>(questionList);
    }

    public void addTitle(String title) {
        this.title = title;
    }

    public String getTitle() {
        return  this.title;
    }

}
