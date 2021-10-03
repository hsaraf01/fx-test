package com.fxtest.model;

import java.util.Map;

public class Result {

    private String userId;
    private Map<String, String> questionAnswerMap;
    private float score;
    private EvalType type;

    public Result(String userId, EvalType type, Map<String, String> questionAnswerMap, float score) {
        this.userId = userId;
        this.questionAnswerMap = questionAnswerMap;
        this.score = score;
        this.type = type;
    }

    public String getUserId() {
        return userId;
    }

    public Map<String, String> getQuestionAnswerMap() {
        return questionAnswerMap;
    }

    public float getScore() {
        return score;
    }

    public static enum EvalType {
        PRE,
        POST
    }
}
