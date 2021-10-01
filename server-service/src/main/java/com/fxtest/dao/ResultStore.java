package com.fxtest.dao;

import com.fxtest.model.Result;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ResultStore {

    Map<String, Result> store = new ConcurrentHashMap<>();

    public void addResult(Result result) {
        store.put(result.getUserId(), result);
    }



}
