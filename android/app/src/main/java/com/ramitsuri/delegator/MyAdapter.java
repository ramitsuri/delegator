package com.ramitsuri.delegator;

import android.content.Context;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by 310247189 on 6/24/2016.
 */
public class MyAdapter extends BaseAdapter {
    Context context;
    List<RowItems> itemsList;
    int layout;

    public MyAdapter(Context c, int l, List<RowItems> itemsList) {
        this.itemsList = itemsList;
        this.context = c;
        this.layout = l;
    }

//    @Override
//    public RowViewholder onCreateViewHolder(ViewGroup parent, int viewType) {
//
//        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.list_row, parent, false);
//        RowViewholder pvh = new RowViewholder(v);
//        return pvh;
//    }
//
//    @Override
//    public void onBindViewHolder(RowViewholder holder, int position) {
//        RowItems items = itemsList.get(position);
//
//        holder.textView.setText(String.valueOf(items.getName()) + " - " );
//    }
//
//    @Override
//    public void onAttachedToRecyclerView(RecyclerView recyclerView) {
//        super.onAttachedToRecyclerView(recyclerView);
//    }
//
//    @Override
//    public int getItemCount() {
//        if (itemsList == null) {
//            return 0;
//        } else {
//            return itemsList.size();
//        }
//    }

    public void update(ArrayList<RowItems> list){
        itemsList.clear();
        itemsList.addAll(list);
        this.notifyDataSetChanged();
    }

    @Override
    public int getCount() {
        return itemsList.size();
    }

    @Override
    public Object getItem(int i) {
        return null;
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            convertView = ((LayoutInflater) context
                    .getSystemService(Context.LAYOUT_INFLATER_SERVICE))
                    .inflate(layout, null);
        }

        RowItems aBlog = itemsList.get(position);

        TextView txtTitle = (TextView) convertView.findViewById(R.id.doneBy);
//        TextView txtUrl = (TextView) convertView.findViewById(R.id.txtUrl);

        txtTitle.setText(aBlog.getName()+ " - " + aBlog.getDoneBy());
        //txtUrl.setText(aBlog.getUrl());

        return convertView;
    }
}
