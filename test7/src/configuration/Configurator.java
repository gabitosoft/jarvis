/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.and open the template in the editor.
 */

package configuration;

/**
 *
 * @author Gabriel Edgar Delgado Rocha
 */

import java.util.ArrayList;
import net.sf.json.JSONObject;
import utils.FileManager;

public class Configurator {
    
    private JSONObject settings;
    private final String CONFIG_PATH = "config.txt";
    private final String KEY_URL = "url";
    private final String KEY_USERNAME = "username";
    private final String KEY_PASSWORD = "password";
    private final String KEY_TOKEN = "token";
    private final String DEFAULT_ANSWER = "Invalid";
    
    public Configurator() {
    
        this.settings = new JSONObject();
        settings.clear();
        
        try {
            FileManager fileManager = new FileManager();
            if (fileManager.existFile(CONFIG_PATH)) {

                ArrayList<String> content = fileManager.readFile(CONFIG_PATH);
                settings.put(KEY_URL, content.get(0));
                settings.put(KEY_USERNAME, content.get(1));
                settings.put(KEY_PASSWORD, content.get(2));
                settings.put(KEY_TOKEN, content.get(3));
            } else {
                settings.put(KEY_URL, DEFAULT_ANSWER);
                settings.put(KEY_USERNAME, DEFAULT_ANSWER);
                settings.put(KEY_PASSWORD, DEFAULT_ANSWER);
                settings.put(KEY_TOKEN, DEFAULT_ANSWER);
            }
        } catch(Exception ex) {
            
            System.out.println(ex.getMessage());
            // TODO add to logger
        }
    }

    /**
     * @return the url
     */
    public String getUrl() {
        return this.settings.getString("url");
    }
    
    /**
     * @return the JSONObject
     */
    public JSONObject getSettings() {
        
        return this.settings;
    }
    
    /**
     * @param settings the settings to set
     */
    public void setSettings(JSONObject settings) {
        
        this.settings = settings;
    }
    
    /**
     * 
     * @param path 
     */
    public void fillSettingsFromFile(String path) {
    
        settings.clear();
        FileManager fmanager = new FileManager();
        for (String text : fmanager.readFile("conf.txt") ) {
        
            String[] data = text.split(",");
            settings.put(data[0], data[1]);
        }
    }
}
