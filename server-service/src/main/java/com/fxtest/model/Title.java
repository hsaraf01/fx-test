package com.fxtest.model;

public class Title {

    private String id;
    private String title;

    public Title(String id, String title) {
        this.id = id;
        this.title = title;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    @Override
    public String toString() {
        return "Title{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                '}';
    }
}
