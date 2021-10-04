package com.fxtest.service;

import com.fxtest.dao.QuestionStore;
import com.fxtest.dao.ResultStore;
import com.fxtest.dao.UserStore;
import com.fxtest.model.Option;
import com.fxtest.model.Question;
import com.fxtest.model.Result;
import com.fxtest.model.Submission;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResultService {

    @Autowired
    private ResultStore resultStore;

    @Autowired
    private QuestionStore questionStore;

    @Autowired
    private UserStore userStore;

    @Autowired
    private SSEEmitterService emitterService;

    public void preEvalSubmission(Submission submission) {
        float scoreInPercent = getScoreInPercent(submission);
        Map<String, String> submittedQA = getSubmittedQAInMap(submission);
        Result result = new Result(submission.getUserId(), Result.EvalType.PRE, submittedQA, scoreInPercent);
        resultStore.addPreEvalResult(result);
        emitterService.preEvalSubmitted(submission.getUserId(), scoreInPercent + "%");
    }

    public void postEvalSubmission(Submission submission) {
        float scoreInPercent = getScoreInPercent(submission);
        Map<String, String> submittedQA = getSubmittedQAInMap(submission);
        Result result = new Result(submission.getUserId(), Result.EvalType.POST, submittedQA, scoreInPercent);
        resultStore.addPostEvalResult(result);
        emitterService.postEvalSubmitted(submission.getUserId(), scoreInPercent + "%");
    }

    public void clearCache() {
        questionStore.clearStore();
        resultStore.clearStore();
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
        return score * 100 / answerSheet.size();
    }

    public ByteArrayInputStream preparePreEvalResultExcel() throws IOException {
        return generateExcel("PreEvaluation", resultStore.getPreEvalResult());

    }

    public ByteArrayInputStream preparePostEvalResultExcel() throws IOException {
        return generateExcel("PostEvaluation", resultStore.getPostEvalResult());

    }

    private ByteArrayInputStream generateExcel(String sheetName, Map<String, Result> userEvalResultMap) throws IOException {
        Map<String, String> questions = questionStore.getAllQuestion().stream()
                .collect(Collectors.toMap(Question::getId, Question::getQuestion));
        Map<String, String> answers = questionStore.getAllQuestion().stream()
                .map(Question::getOptions)
                .flatMap(List::stream)
                .collect(Collectors.toMap(Option::getId, Option::getOption));
        List<String> userIdList = new ArrayList<>(userEvalResultMap.keySet());
        List<String> questionList = new ArrayList<>(questions.keySet());

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet(sheetName);

        Row row = sheet.createRow(0);
        Cell cell = row.createCell(0);
        cell.setCellValue("");

        for (int i = 0; i < questionList.size(); i++) {
            String questionId = questionList.get(i);
            Cell newCell = row.createCell(i + 1);
            newCell.setCellValue(questions.get(questionId));
        }

        for (int i = 0; i < userIdList.size(); i++) {
            String userId = userIdList.get(i);
            Row newRow = sheet.createRow(i + 1);
            Cell newCell = newRow.createCell(0);
            newCell.setCellValue(userStore.username(userId));
            for (int j = 0; j < questionList.size(); j++) {
                String questionId = questionList.get(j);
                String userAnswerId = userEvalResultMap.get(userId).getQuestionAnswerMap().get(questionId);
                Cell answerCell = newRow.createCell(j + 1);
                answerCell.setCellValue(answers.get(userAnswerId));
            }
        }

        for(int k=0;k< row.getLastCellNum(); k++) {
            sheet.autoSizeColumn(k);
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        return new ByteArrayInputStream(outputStream.toByteArray());
    }

}
