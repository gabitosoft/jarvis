/*
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.and open the template in the editor.
 */
/* 
    Author     : Gabriel Edgar Delgado Rocha
*/

function loadScript(url, callback) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    head.appendChild(script);
}

function init() {

        $.mobile.loading( 'show');

        loadScript('js/socket.io.js', function () {

            var socket = io.connect($('#server').val() + ':' + $('#port').val());
            //var socket = io.connect("http://10.31.48.50:3000");

            socket.on('alert', function (data) {
                $('#alertList').append('<li class="alert-item list-group-item-'+ data.type +'" ><a href="#description">' +
                        '<h3 class="list-group-item-heading">' + data.title + '</h3>' +
                        '<p class="list-group-item-text">' + data.description + '</p>' +
                        '<p class="list-group-item-text">' + data.date + '</p>' +
                        '</a></li>'
                );
                socket.emit('message', { message: 'Client was notified' });

                window.plugin.notification.local.add({
                    id:      data._id,
                    title:   data.title,
                    message: data.description,
                    autoCancel: true,
                    sound: 'android.resource://sounds-767-arpeggio'
                });
            });

            socket.on('connect', function () {
                $('#status').html('Connected');
                socket.emit('username', $('#username').val());
            });

            socket.on('reconnect', function () {
                $('#status').html('Reconnected');
            });

            socket.on('disconnect', function () {
                $('#status').html('Disconnected');
            });

            socket.on('reconnecting', function () {
                $('#status').html('Reconnecting...');
            });

            socket.on('error', function () {
                $('#status').html('Error');
            });
        });

        $.mobile.loading( 'hide');
    }