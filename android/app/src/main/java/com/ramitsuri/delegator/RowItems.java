package com.ramitsuri.delegator;

/**
 * Created by 310247189 on 6/24/2016.
 */
public class RowItems {
    private String doneBy;
    private String dutyName;
    private String fine;

    public String getDoneBy() {
        return doneBy;
    }

    public void setDoneBy(String doneBy) {
        this.doneBy = doneBy;
    }

    public String getDutyName(){
        return dutyName;
    }

    public void setDutyName(String name){
        dutyName = name;
    }

    public String getFine(){
        return fine;
    }

    public void setFine(String newFine){
        fine = newFine;
    }
}
