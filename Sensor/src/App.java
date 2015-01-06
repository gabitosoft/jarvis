/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.and open the template in the editor.
 */

/**
 *
 * @author Gabriel Edgar Delgado Rocha
 */

import java.io.IOException;

import utils.Interpreter;
import network.NotifierHTTP;
import configuration.Configurator;
import net.sf.json.JSONObject;

public class App {
    
    private static final String ALERT_API_URL = "/api/alert/create";
    
    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {

        try {

            Configurator config = new Configurator();
            Interpreter interpreter = new Interpreter();
            JSONObject jsonObject = interpreter.buildJSON(args, config.getSettings());
            
            if (interpreter.isValid(jsonObject)) {
            
                NotifierHTTP notifier = new NotifierHTTP(config.getUrl() + ALERT_API_URL);
                JSONObject result = notifier.sendPOST(jsonObject);
                System.out.println(result.get("result"));
            }
            
        } catch(IOException ex) {
            
            System.out.println(ex.getMessage());
            // TODO add to logger
        }
    }
}
