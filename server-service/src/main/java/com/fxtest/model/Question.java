package com.fxtest.model;

import java.util.List;

public class Question {

    private String id;
    private String question;
    private List<Option> options;
    private String answerId;

    public Question(String id, String question, List<Option> options, String answerId) {
        this.id = id;
        this.question = question;
        this.options = options;
        this.answerId = answerId;
    }

    public Question(String id, String question, List<Option> options) {
        this.id = id;
        this.question = question;
        this.options = options;
    }

    public String getId() {
        return id;
    }

    public String getQuestion() {
        return question;
    }

    public List<Option> getOptions() {
        return options;
    }

    public String getAnswerId() {
        return answerId;
    }
}
