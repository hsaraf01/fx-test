package com.fxtest.service;

import com.fxtest.model.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

@Service
public class SSEEmitterService {

    private BlockingQueue<ServerSentEvent<String>> blockingQueue = new LinkedBlockingQueue<>();

    Gson gson = new GsonBuilder().create();

    public ServerSentEvent<String> nextEvent() {
        ServerSentEvent<String> event = blockingQueue.poll();
        if (event == null) {
            return heartBeatEvent();
        } else {
            return event;
        }
    }

    public void publishEvent(ServerSentEvent<String> event) {
        try {
            blockingQueue.put(event);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    public ServerSentEvent<String> heartBeatEvent() {
        return ServerSentEvent.<String>builder()
                .event(Event.HEARTBEAT_EVENT.toString())
                .data(LocalTime.now().toString())
                .build();
    }

    public void emitUserLoggedInEvent(User user) {
        publishEvent(ServerSentEvent.<String>builder()
                .event(Event.USER_LOGGED_IN.toString())
                .data(gson.toJson(user))
                .build());
    }

    public void preEvalSubmitted(String userId, String score) {
        publishEvent(ServerSentEvent.<String>builder()
                .event(Event.PRE_EVAL_COMPLETED.toString())
                .data(gson.toJson(new PreEvalCompleted(userId, score, "")))
                .build());
    }

    public void postEvalSubmitted(String userId, String score) {
        publishEvent(ServerSentEvent.<String>builder()
                .event(Event.POST_EVAL_COMPLETED.toString())
                .data(gson.toJson(new PreEvalCompleted(userId, "", score)))
                .build());
    }

    private static class PreEvalCompleted {
        String userId;
        String preEvalScore;
        String postEvalScore;

        public PreEvalCompleted(String userId, String preEvalScore, String postEvalScore) {
            this.userId = userId;
            this.preEvalScore = preEvalScore;
            this.postEvalScore = postEvalScore;
        }

    }

    enum Event {
        HEARTBEAT_EVENT,
        USER_LOGGED_IN,
        PRE_EVAL_COMPLETED,
        POST_EVAL_COMPLETED
    }

}
