package com.fxtest.dao;

import com.fxtest.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Component
public class UserStore {

    Map<String, User> userStore = new ConcurrentHashMap<>();

    public void addUser(User user) {
      userStore.put(user.getId(), user);
    }

    public List<User> getAllUser() {
      return userStore.entrySet().stream().map(Map.Entry::getValue).collect(Collectors.toList());
    }

    public String username(String userId) {
        return userStore.get(userId).getName();
    }

}
