package com.fxtest.service;

import com.fxtest.dao.QuestionStore;
import com.fxtest.dao.ResultStore;
import com.fxtest.model.Question;
import com.fxtest.model.Result;
import com.fxtest.model.Submission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResultService {

    @Autowired
    private ResultStore resultStore;

    @Autowired
    private QuestionStore questionStore;


    public void addResult(Submission submission) {
        Map<String,String> answerSheet= questionStore.getAllQuestion()
                    .stream()
                    .collect(Collectors.toMap(Question::getId, Question::getAnswerId));
        long score =submission.getQuestionAnswers().stream().filter(qa -> answerSheet.get(qa.getQuestionId()).equalsIgnoreCase(qa.getAnswerId())).count();
        Map<String,String> submittedQA= submission.getQuestionAnswers()
                .stream()
                .collect(Collectors.toMap(Submission.QuestionAnswer::getQuestionId, Submission.QuestionAnswer::getAnswerId));
        Result result = new Result(submission.getUserId(), submittedQA, score);
        resultStore.addResult(result);
    }

}
