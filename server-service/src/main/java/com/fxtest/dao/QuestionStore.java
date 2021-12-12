package com.fxtest.dao;

import com.fxtest.model.Question;
import com.fxtest.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class QuestionStore {

    private Map<String, List<Question>> store = new ConcurrentHashMap<>();

    public void addQuestion(String titleId, Question question) {
     List<Question> questionList  = store.getOrDefault(titleId, new ArrayList<>());
     questionList.add(question);
     store.put(titleId, questionList);
    }

    public List<Question> getQuestionSet(String titleId) {
        List<Question> questionList = store.getOrDefault(titleId, new ArrayList<>());
        return new ArrayList<>(questionList);
    }

    public void clearStore() {
        store.clear();
    }

}
