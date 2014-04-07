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

public class App {
    
    /**
     * @param args the command line arguments
     */
    public static void main(String args[]) {

        try {

            Configurator config = new Configurator();
            Interpreter interpreter = new Interpreter();
            NotifierHTTP notifier = new NotifierHTTP(config.getUrl());
            notifier.sendPOST(interpreter.buildJSON(args, config.getSettings()));
        } catch(IOException ex) {
            
            System.out.println(ex.getMessage());
            // TODO add to logger
        }
    }
}
