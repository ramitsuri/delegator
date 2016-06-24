package com.ramitsuri.delegator;

import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.widget.TextView;

/**
 * Created by 310247189 on 6/24/2016.
 */
public class RowViewholder extends RecyclerView.ViewHolder {

    TextView textView;

    public RowViewholder(View view) {
        super(view);
        this.textView = (TextView) view.findViewById(R.id.title);
    }
}