package com.fxtest.dao;

import com.fxtest.model.Title;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TitleStore {

    private Logger logger = LoggerFactory.getLogger(TitleStore.class);
    private List<Title> titleList = new ArrayList<>();
    private String activeTitleId;
    private String activeEvaluation;

    public void addTitle(Title title) {
        titleList.add(title);
    }

    public void setActiveTitle(Title title) {
        activeTitleId = title.getId();
        logger.info("Active title set to : {}", title);
    }

    public String getActiveTitleId() {
        return activeTitleId;
    }

    public String getActiveTitle() {
        Optional<Title> activeTitle = titleList.stream().filter(title -> title.getId().equalsIgnoreCase(activeTitleId)).findFirst();
        if(activeTitle.isPresent()) {
            return activeTitle.get().getTitle();
        }
        logger.warn("Active title not yet set");
        return "";
    }

    public List<Title> getAllTitles() {
        return new ArrayList<>(titleList);
    }

    public Title getTitle(String titleId) {
        return titleList.stream().filter(title -> title.getId().equalsIgnoreCase(titleId)).findAny().get();
    }

    public void setActiveEvaluation(String activeEvaluation) {
        this.activeEvaluation = activeEvaluation;
        logger.info("Active Evaluation set to : {}", activeEvaluation);
    }

    public String getActiveEvaluation() {
        return this.activeEvaluation;
    }
}
