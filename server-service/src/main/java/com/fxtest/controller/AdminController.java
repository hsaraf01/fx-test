package com.fxtest.controller;

import com.fxtest.model.Question;
import com.fxtest.model.User;
import com.fxtest.service.RestService;
import com.fxtest.service.SSEEmitterService;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

import java.time.Duration;

@RestController
public class AdminController {

    @Autowired
    private RestService restService;

    @Autowired
    private SSEEmitterService emitterService;

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
    @ApiParam()
    public Question addQuestion(@ApiParam(name="newQuestion") @RequestParam String newQuestion,
                                @ApiParam(name="option1") @RequestParam String option1,
                                @ApiParam(name="option2") @RequestParam String option2,
                                @ApiParam(name="option3") @RequestParam String option3,
                                @ApiParam(name="option4") @RequestParam String option4,
                                @ApiParam(name="rightAnswerOption" ) @RequestParam Integer rightAnswerOption
    ) {
        return restService.addQuestion(newQuestion, option1, option2, option3, option4,rightAnswerOption);
    }

    @GetMapping(value = "/addUser/{name}")
    public User addUser(@PathVariable("name") String name) {
        return restService.addUser(name);
    }
}
