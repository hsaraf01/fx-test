package com.fxtest.controller;

import com.fxtest.model.Question;
import com.fxtest.model.Submission;
import com.fxtest.model.User;
import com.fxtest.service.RestService;
import com.fxtest.service.ResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private RestService restService;

    @Autowired
    private ResultService resultService;

    @GetMapping(value = "/users")
    public List<User> getAllUser() {
        return restService.getAllUsers();
    }

    @GetMapping(value ="/preEvalQuestions")
    public List<Question> getPreEvalQuestions() {
        return restService.getPreEvalQuestions();
    }

    @GetMapping(value = "/title")
    public String getTitle() {
        return restService.getTitle();
    }

    @PostMapping(value = "/preEvalSubmission")
    public void preEvalSubmission(@RequestBody Submission submission) {
        resultService.preEvalSubmission(submission);
    }

    @PostMapping(value = "/postEvalSubmission")
    public void postEvalSubmission(@RequestBody Submission submission) {
        resultService.postEvalSubmission(submission);
    }


    @PostMapping(value = "/userLoggedIn")
    public void userLoggedIn(@RequestBody User user) {
        restService.userLoggedIn(user);
    }
}
