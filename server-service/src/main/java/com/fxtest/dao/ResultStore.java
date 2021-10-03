package com.fxtest.dao;

import com.fxtest.model.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class ResultStore {

    Map<String, List<Result>> store = new ConcurrentHashMap<>();

    public void addResult(Result result) {
        List<Result> results = store.getOrDefault(result.getUserId(), new ArrayList<>());
        results.add(result);
    }



}
