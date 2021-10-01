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

    @GetMapping(value = "/addUser/{name}")
    public User addUser(@PathVariable("name") String name) {
        return restService.addUser(name);
    }

    @GetMapping(value ="/preEvalQuestions")
    public List<Question> getPreEvalQuestions() {
        return restService.getPreEvalQuestions();
    }

    @GetMapping(value = "/addQuestion")
    public Question addQuestion(@RequestParam String question,
                                @RequestParam String option1,
                                @RequestParam String option2,
                                @RequestParam String option3,
                                @RequestParam String option4,
                                @RequestParam int answerOption
                                ) {
        return restService.addQuestion(question, option1, option2, option3, option4,answerOption);
    }

    @GetMapping(value = "/title")
    public String getTitle() {
        return restService.getTitle();
    }

    @GetMapping(value = "/addTitle")
    public void addTitle(@RequestParam String title) {
        restService.addTitle(title);
    }

    @PostMapping(value = "/preEvalSubmission")
    public void submission(@RequestBody Submission submission) {
        resultService.addResult(submission);
    }


}
