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

import java.io.BufferedReader;
import java.io.File;
import java.util.ArrayList;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class FileManager {
    
    /**
     * 
     * @param path
     * @return 
     */
    public ArrayList<String> readFile(String path) {
    
        ArrayList<String> content = new ArrayList();
        Path file = Paths.get(path);
        try (InputStream in = Files.newInputStream(file);
            BufferedReader reader =
              new BufferedReader(new InputStreamReader(in))) {
            String line = null;
            while ((line = reader.readLine()) != null) {
                content.add(line);
            }
        } catch (IOException x) {
            
            System.err.println(x);
            // TODO add to logger
        }
        
        return content;
    }
    
    /**
     * 
     * @param path
     * @return 
     */
    public boolean existFile(String path) {
        File file = new File(path);
        
        return file.exists();
    }
    
    /**
     * 
     * @param path
     * @param content 
     */
    public void writeFile(String path, ArrayList<String> content) {
    
        try {
            try (PrintWriter writer = new PrintWriter(path, "UTF-8")) {
                for (String text : content) {
                    writer.println(text);
                }
            }
        } catch(IOException ex) {
        
            System.out.println(ex.getMessage());
            // TODO add to logger
        }
    }
}
