package com.ramitsuri.delegator;

import android.app.ProgressDialog;
import android.inputmethodservice.Keyboard;
import android.os.AsyncTask;
import android.support.v4.media.VolumeProviderCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.widget.ListView;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.Console;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.io.Writer;
import java.lang.reflect.Type;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

public class MainActivity extends AppCompatActivity {
    private RecyclerView mRecyclerView;
    private MyAdapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;
    private String urlStringHome ="http://70.171.44.98:1398/duty/all";
    DutiesResponse duties;
    ArrayList<RowItems> items;
    private ListView listView;
    ProgressDialog PD;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        PD = new ProgressDialog(this);
        PD.setMessage("Loading.....");
        PD.setCancelable(false);

        //mRecyclerView = (RecyclerView) findViewById(R.id.my_recycler_view);
        //mRecyclerView.setHasFixedSize(true);


        mLayoutManager = new LinearLayoutManager(this);
        //mRecyclerView.setLayoutManager(mLayoutManager);
        items = new ArrayList<>();
        listView = (ListView) findViewById(R.id.listview);
        mAdapter = new MyAdapter(this,R.layout.list_row, items);
        //mRecyclerView.setAdapter(mAdapter);
        listView.setAdapter(mAdapter);

        RequestQueue requestQueue = Volley.newRequestQueue(this);
        JsonArrayRequest jsonArrayRequest = new JsonArrayRequest(urlStringHome, new Response.Listener<JSONArray>() {
            @Override
            public void onResponse(JSONArray response) {
                try {
                    if (response.length() > 0) {
                        items.clear();
                        for (int i = 0; i < response.length(); i++) {
                            JSONObject jsonObject = response.getJSONObject(i);
                            RowItems person = new RowItems();
                            if (!jsonObject.isNull("name")) {
                                person.setName(jsonObject.getString("name"));
                            }

                            if (!jsonObject.isNull("doneBy")) {
                                person.setDoneBy(jsonObject.getString("doneBy"));
                            }

                            if (!jsonObject.isNull("lastDoneBy")) {
                                person.setLastDoneBy(jsonObject.getString("lastDoneBy"));
                            }

                            items.add(i, person);
                        }
                        mAdapter.notifyDataSetChanged();
                        String a = ";";
                    }
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                // do something
            }
        });

        requestQueue.add(jsonArrayRequest);

        //jsonRequest();
        //getData();
    }

    public ArrayList<RowItems> getData()
    {
        ArrayList<RowItems> it = new ArrayList<RowItems>();
        RowItems it1 = new RowItems();
        it1.setName("ramit");
        it.add(it1);
        it1.setName("dhruv");
        it.add(it1);


        //new TriggerRequest().execute(new String[] {urlStringHome});


        return it;
    }

//    private void jsonRequest() {
//        PD.show();
//        JsonArrayRequest jsObjRequest = new JsonArrayRequest
//                (urlStringHome, new Response.Listener<JSONArray>() {
//
//                    @Override
//                    public void onResponse(JSONArray response) {
////                        mTxtDisplay.setText("Response: " + response.toString());
//                        String str1  = "{\"duties\":" + response.toString() + "}";
//                        Gson gson = new GsonBuilder().create();
//                        duties = gson.fromJson(str1, DutiesResponse.class);
//                        items = duties.duties;
//                        String a = "";
//
//int sa = mAdapter.getItemCount();
//                        //mAdapter = new MyAdapter(MainActivity.this, duties.duties);
//                        //mRecyclerView.setAdapter(mAdapter);
//                        mAdapter.notifyDataSetChanged();
//                        sa = mAdapter.getItemCount();
//                        PD.dismiss();
//                        try {
//
//                            items.clear();
//                            for (int i = 0; i < response.length(); i++) {
//                                JSONObject jsonObject = response.getJSONObject(i);
//                                RowItems person = new RowItems();
//
//                                person.setName(jsonObject.getString("name"));
//
//
//                                items.add(i, person);
//                            }
//                            mAdapter.notifyDataSetChanged();
//                        }
//                        catch (JSONException s){
//
//                        }
//                    }
//                }, new Response.ErrorListener() {
//
//                    @Override
//                    public void onErrorResponse(VolleyError error) {
//                        // TODO Auto-generated method stub
//
//                    }
//                });
//        RequestQueue requestQueue = Volley.newRequestQueue(this);
//        requestQueue.add(jsObjRequest);
//    }

    private class TriggerRequest extends AsyncTask<String, Void, String>{

        @Override
        protected String doInBackground(String... params) {
            return processRequest(params[0]);
        }


        private String processRequest(String urlString){
            String str = "";

                InputStream stream = sendRequest(urlString);
            try {
                str = "{\"duties\":" + getStringFromIS(stream)+ "}";
                //String str1  = "{\"duties\":" + response.toString() + "}";
                Gson gson = new GsonBuilder().create();
                duties = gson.fromJson(str, DutiesResponse.class);
                String a = "";
                mAdapter.notifyDataSetChanged();
                PD.dismiss();
            } catch (IOException e) {
                e.printStackTrace();
            }


            return str;
        }

        private InputStream sendRequest(String urlString) {
            URL url = null;
            InputStream is = null;
            try {
                url = new URL(urlString);
                HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
                is = urlConnection.getInputStream();

            }
            catch (MalformedURLException e) {
                e.printStackTrace();
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            } catch (ProtocolException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return is;
        }

        private String getStringFromIS(InputStream inputStream) throws IOException {
            StringBuilder stringBuffer = new StringBuilder();
            if (inputStream == null) {
                return null;
            }
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            String inputLine;
            while ((inputLine = bufferedReader.readLine()) != null)
                stringBuffer.append(inputLine).append("\n");
            if (stringBuffer.length() == 0) {
                return null;
            }
            return stringBuffer.toString();
        }
    }
}
