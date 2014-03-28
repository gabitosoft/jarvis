
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import net.sf.json.JSONObject;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author gabriel
 */
public class App {
    public static void main(String args[]) {
    
        //curl -i 'http://localhost:3000/api/alert' -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"auth": { "passwordCredentials": {"username": "adm", "password": "pwd"},"tenantName":"adm"}}'
        //curl -d '{"server":"127.0.0.1", "date":"04-03-2014", "message": "Alert from console", "read": false, "type": "list-group-item-danger"}' -H "Content-Type: application/json" http://localhost:3000/api/alert
        String url="http://localhost:3000/api/alert";

        try {
            URL object = new URL(url);
            HttpURLConnection con = (HttpURLConnection) object.openConnection();
            con.setDoOutput(true);
            con.setDoInput(true);

            con.setRequestProperty("Content-Type", "application/json; charset=utf8");
            con.setRequestProperty("Accept", "application/json");
            con.setRequestMethod("POST");
            JSONObject cred = new JSONObject();
            JSONObject auth = new JSONObject();
            JSONObject parent = new JSONObject();

//            cred.put("username","adm");
//            cred.put("password", "pwd");
//            auth.put("tenantName", "adm");
//            auth.put("passwordCredentials", cred);
//            parent.put("auth", auth);
            
            parent.put("datetime", "28-03-2014, 08:13");
            parent.put("message", "JAVA Alert");
            parent.put("read", "false");
            //parent.put("type", "list-group-item-danger");
            parent.put("type", "list-group-item-info");

            OutputStreamWriter wr= new OutputStreamWriter(con.getOutputStream());
            wr.write(parent.toString());
            wr.flush();

            //display what returns the POST request
            StringBuilder sb = new StringBuilder();  
            int HttpResult =con.getResponseCode(); 

            if(HttpResult == HttpURLConnection.HTTP_OK) {

                BufferedReader br = new BufferedReader(new InputStreamReader(con.getInputStream(),"utf-8"));  
                String line = null;  

                while ((line = br.readLine()) != null) {  
                    sb.append(line);  
                    sb.append("\n");  
                } 

                br.close();  
                System.out.println(""+sb.toString());  
                
            } else {
                
                System.out.println(con.getResponseMessage());  
            }
        } catch(Exception ex) {
            
            System.out.println(ex.getMessage());
        }  
    }
}
