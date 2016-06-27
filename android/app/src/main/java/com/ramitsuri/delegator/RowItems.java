package com.ramitsuri.delegator;

/**
 * Created by 310247189 on 6/24/2016.
 */
public class RowItems {
    private String doneBy;
    private String name;
    private String lastDoneBy;
    private int localID;

    public String getDoneBy() {
        return doneBy;
    }

    public void setDoneBy(String doneBy) {
        this.doneBy = doneBy;
    }

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getLastDoneBy(){
        return lastDoneBy;
    }

    public void setLastDoneBy(String newFine){
        lastDoneBy = newFine;
    }

    public int getLocalID(){
        return localID;
    }

    public void setLocalID(int id){
        localID = id;
    }
}
