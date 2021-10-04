package com.fxtest.dao;

import com.fxtest.model.Result;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ResultStore {

    Map<String, Result> preEvalStore = new ConcurrentHashMap<>();
    Map<String, Result> postEvalStore = new ConcurrentHashMap<>();

    public void addPreEvalResult(Result result) {
        preEvalStore.put(result.getUserId(), result);
    }

    public void addPostEvalResult(Result result) {
        postEvalStore.put(result.getUserId(), result);
    }

    public Map<String, Result> getPreEvalResult() {
        return preEvalStore;
    }

    public Map<String, Result> getPostEvalResult() {
        return postEvalStore;
    }

    public void clearStore() {
        preEvalStore.clear();
        postEvalStore.clear();
    }


}
