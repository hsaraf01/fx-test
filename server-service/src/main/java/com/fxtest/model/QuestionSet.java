package com.fxtest.model;

import java.util.List;

public class QuestionSet {

    private Title title;
    private List<Question> questions;

    public QuestionSet(Title title, List<Question> questions) {
        this.title = title;
        this.questions = questions;
    }

    public Title getTitle() {
        return title;
    }

    public List<Question> getQuestions() {
        return questions;
    }
}
