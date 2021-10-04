package com.fxtest.controller;

import com.fxtest.model.Question;
import com.fxtest.model.User;
import com.fxtest.service.RestService;
import com.fxtest.service.ResultService;
import com.fxtest.service.SSEEmitterService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.time.Duration;

@RestController
public class AdminController {

    @Autowired
    private RestService restService;

    @Autowired
    private SSEEmitterService emitterService;

    @Autowired
    private ResultService resultService;

    @GetMapping(path = "/stream-flux")
    public Flux<ServerSentEvent<String>> streamFlux() {
        return Flux.interval(Duration.ofSeconds(2))
                .map(sequence -> emitterService.nextEvent());
    }

    @GetMapping(value = "/addTitle")
    public void addTitle(@RequestParam String title) {
        restService.addTitle(title);
    }

    @GetMapping(value = "/addQuestion")
    public Question addQuestion(@ApiParam(name = "newQuestion",required = true) @RequestParam String newQuestion,
                                @ApiParam(name = "option1",required = true) @RequestParam String option1,
                                @ApiParam(name = "option2",required = true) @RequestParam String option2,
                                @ApiParam(name = "option3",required = true) @RequestParam String option3,
                                @ApiParam(name = "option4",required = true) @RequestParam String option4,
                                @ApiParam(name = "rightAnswerOption",required = true) @RequestParam Integer rightAnswerOption
    ) {
        return restService.addQuestion(newQuestion, option1, option2, option3, option4, rightAnswerOption);
    }

    @GetMapping(value = "/addUser/{name}")
    public User addUser(@PathVariable("name") String name) {
        return restService.addUser(name);
    }

    @PostMapping(value = "/clearCache")
    public void clearStore() {
        resultService.clearCache();
    }

    @GetMapping("/preEvalDownload")
    public ResponseEntity<Resource> downloadPreEval() throws IOException {
        return prepareFileDownloadResponse(resultService.preparePreEvalResultExcel(),"preEvaluation.xlsx");
    }

    @GetMapping("/postEvalDownload")
    public ResponseEntity<Resource> downloadPostEval() throws IOException {
        return prepareFileDownloadResponse(resultService.preparePostEvalResultExcel(),"postEvaluation.xlsx");

    }

    private ResponseEntity<Resource> prepareFileDownloadResponse(ByteArrayInputStream byteArrayInputStream, String fileName) {
        InputStreamResource file = new InputStreamResource(byteArrayInputStream);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
}
