/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.and open the template in the editor.
 */

package utils;

/**
 *
 * @author Gabriel Edgar Delgado Rocha
 */

import java.net.InetAddress;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import net.sf.json.JSONObject;

public class Interpreter {
    
    /**
     * 
     * @param arguments
     * @param settings
     * @return JSONObject
     */
    public JSONObject buildJSON(String[] arguments, JSONObject settings) {

        try {
            DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            Date currentDate = new Date();
            InetAddress address = InetAddress.getLocalHost(); 

            settings.put("date", dateFormat.format(currentDate));
            settings.put("read", "false");
            settings.put("source", address.getHostAddress());

            for (int i = 0; i < arguments.length; i++) {

                if (arguments[i].charAt(0) == '-' && i+1 < arguments.length) {

                    switch (arguments[i]) {
                        case "-p":
                                settings.put("type", arguments[i+1]);
                            break;
                        case "-d":
                            settings.put("description", arguments[i+1]);
                            break;
                        case "-t":
                            settings.put("title", arguments[i+1]);
                            break;
                        case "-h":
                            System.out.println("- Notifier v.0.2 -");
                            System.out.println("-h\t\t Display this message");
                            System.out.println("-p\t\t Alert Type, just choose one of this [ alert, info, warning ]");
                            System.out.println("-d\t\t Alert Description, if the description has more than one word please to use \"\" around the word");
                            System.out.println("-t\t\t Alert Title, if the description has more than one word please to use \"\" around the word");
                            System.out.println("Please to use: java -jar notifier.jar -p < danger | info | warning > -t \"title Alert\" -d \"Descriptio Alert\" ");
                            System.out.println("Settings content:");
                            System.out.println(settings.toString());
                            break;
                        default: 
                            settings.put("title", "Invalid Parameter");
                            settings.put("description", "The Parameter: " + 
                                    arguments[i]+" is not recognized");
                            break;
                    }
                }
            }
        } catch (Exception ex) {
            // TODO add to logger
            System.out.println(ex.getMessage());
        }
        
        return settings;
    }
}
