package com.fxtest.model;

import java.util.Map;

public class Result {

    private String userId;
    private Map<String, String> questionAnswerMap;
    private long score;

    public Result(String userId, Map<String, String> questionAnswerMap, long score) {
        this.userId = userId;
        this.questionAnswerMap = questionAnswerMap;
        this.score = score;
    }

    public String getUserId() {
        return userId;
    }

    public Map<String, String> getQuestionAnswerMap() {
        return questionAnswerMap;
    }

    public long getScore() {
        return score;
    }
}
