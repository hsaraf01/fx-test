package com.fxtest.dao;

import com.fxtest.model.User;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserStore {

    List<User> userList = new ArrayList<>();

    public void addUser(User user) {
        userList.add(user);
    }

    public List<User> getAllUser() {
      return new ArrayList<>(userList);
    }


}
