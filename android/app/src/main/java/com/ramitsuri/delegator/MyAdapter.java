package com.ramitsuri.delegator;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import java.util.ArrayList;

/**
 * Created by 310247189 on 6/24/2016.
 */
public class MyAdapter extends RecyclerView.Adapter<RowViewholder> {
    Context context;
    ArrayList<RowItems> itemsList;

    public MyAdapter(Context context, ArrayList<RowItems> itemsList) {
        this.context = context;
        this.itemsList = itemsList;
    }

    @Override
    public RowViewholder onCreateViewHolder(ViewGroup parent, int viewType) {

        View view = LayoutInflater.from(context).inflate(R.layout.list_row, parent, false);
        RowViewholder viewHolder = new RowViewholder(view);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(RowViewholder holder, int position) {
        RowItems items = itemsList.get(position);
        holder.textView.setText(String.valueOf(items.getDutyName()) + " - " +String.valueOf(items.getDoneBy()));
    }

    @Override
    public int getItemCount() {
        if (itemsList == null) {
            return 0;
        } else {
            return itemsList.size();
        }
    }
}
