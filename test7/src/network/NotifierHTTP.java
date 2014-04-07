/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.and open the template in the editor.
 */

package network;

/**
 *
 * @author Gabriel Edgar Delgado Rocha
 */

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import net.sf.json.JSONObject;

import java.io.IOException;

public class NotifierHTTP {
    
    private final String url;
    
    /**
     * 
     * @param url 
     */
    public NotifierHTTP(String url) {
        
        this.url = url;
    }
    
    /**
     * 
     * @param json
     * @throws IOException 
     */
    public void sendPOST(JSONObject json) throws IOException {
        
        URL object = new URL(this.url);
        HttpURLConnection connection = (HttpURLConnection) object.openConnection();
        connection.setDoOutput(true);
        connection.setDoInput(true);
        connection.setRequestProperty("Content-Type", "application/json; charset=utf8");
        connection.setRequestProperty("Accept", "application/json");
        connection.setRequestMethod("POST");

        // Send json
        OutputStreamWriter wr = new OutputStreamWriter(connection.getOutputStream());
        wr.write(json.toString());
        wr.flush();

        // Display what returns the POST request
        StringBuilder sb = new StringBuilder();  
        int HttpResult = connection.getResponseCode(); 

        if (HttpResult == HttpURLConnection.HTTP_OK) {
            
            String line;
            try ( BufferedReader br = new BufferedReader(new InputStreamReader(connection.getInputStream(),"utf-8")) ) {
                while ((line = br.readLine()) != null) {
                    sb.append(line);
                    sb.append("\n");
                }
            }

            System.out.println(sb.toString());  
        } else {

            System.out.println(connection.getResponseMessage());  
            // TODO add to logger
        }
    }
}
