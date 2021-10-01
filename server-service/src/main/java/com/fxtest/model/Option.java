package com.fxtest.model;

public class Option {

    private String id;
    private String option;

    public Option(String id, String option) {
        this.id = id;
        this.option = option;
    }

    public String getId() {
        return id;
    }

    public String getOption() {
        return option;
    }
}
