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

    @Autowired
    private SSEEmitterService emitterService;

    public void preEvalSubmission(Submission submission) {
        float scoreInPercent = getScoreInPercent(submission);
        Map<String, String> submittedQA = getSubmittedQAInMap(submission);
        Result result = new Result(submission.getUserId(), Result.EvalType.PRE, submittedQA, scoreInPercent);
        resultStore.addResult(result);
        emitterService.preEvalSubmitted(submission.getUserId(), scoreInPercent+"%");
    }

    public void postEvalSubmission(Submission submission) {
        float scoreInPercent = getScoreInPercent(submission);
        Map<String, String> submittedQA = getSubmittedQAInMap(submission);
        Result result = new Result(submission.getUserId(), Result.EvalType.POST, submittedQA, scoreInPercent);
        resultStore.addResult(result);
        emitterService.postEvalSubmitted(submission.getUserId(), scoreInPercent+"%");
    }

    private Map<String, String> getSubmittedQAInMap(Submission submission) {
        return submission.getQuestionAnswers()
                .stream()
                .collect(Collectors.toMap(Submission.QuestionAnswer::getQuestionId, Submission.QuestionAnswer::getAnswerId));
    }

    private float getScoreInPercent(Submission submission) {
        Map<String, String> answerSheet = questionStore.getAllQuestion()
                .stream()
                .collect(Collectors.toMap(Question::getId, Question::getAnswerId));

        long score = submission.getQuestionAnswers().stream().filter(qa -> answerSheet.get(qa.getQuestionId()).equalsIgnoreCase(qa.getAnswerId())).count();
        return score*100/answerSheet.size();
    }

}
