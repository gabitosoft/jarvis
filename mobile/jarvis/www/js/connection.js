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

            socket.on('alert', function (data) {
//                $('#alertList').append('<li class="alert-item list-group-item-'+ 
//                        data.type + '" ><a href="#description">' +
//                        '<h3 class="list-group-item-heading">' + data.title + '</h3>' +
//                        '<p class="list-group-item-text">' + data.description + '</p>' +
//                        '<p class="list-group-item-text">' + data.date + '</p>' +
//                        '</a></li>'
//                );

                $('<li class="alert-item list-group-item-'+ 
                        data.type + '" ><a href="#description">' +
                        '<h3 class="list-group-item-heading">' + data.title + ' - ' + data.source +'</h3>' +
                        '<p class="list-group-item-text">' + data.description + '</p>' +
                        '<p class="list-group-item-text">' + data.date + '</p>' +
                        '</a></li>').prependTo($('#alertList'));
                
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
            
            loadUnReadAlerts();
            
            $("#alertList").on("click", ".alert-item", function(event){
                var item = $(this);
                var id = item.attr('data-id');
                var date = item.attr('data-date');
                var source = item.attr('data-source');
                var type = item.attr('data-type');
                var title = item.attr('data-title');
                var desc = item.attr('data-des');
              
                //updateAlert(id, source, date, type, title, desc);
            });
        });

        $.mobile.loading( 'hide');
    }
    
    function loadUnReadAlerts() {

      var port = $('#port').val();
      var server = $('#server').val();
      var url = 'http://' + server + ':' + port + '/api/alert/status/false';

      $.getJSON(url, function(data) {

        var listAlerts = $('#alertList');
        listAlerts.empty();
        $.each(data, function(key, value) {

          $('<li data-id="' + value._id + '"' +
                'data-type="' + value.type + '"' +
                'data-title="' + value.title + '"' +
                'data-des="' + value.description + '"' +
                'data-source="' + value.source + '"' +
                'data-date="' + value.date + '"' +
            'class="alert-item list-group-item-'+ 
                        value.type + '" ><a href="#description">' +
                        '<h3 class="list-group-item-heading">' + value.title + ' - ' + value.source +'</h3>' +
                        '<p class="list-group-item-text">' + value.description + '</p>' +
                        '<p class="list-group-item-text">' + value.date + '</p>' +
                        '</a></li>').prependTo(listAlerts);
        });
      }).fail(function(error) {
        alert( "Error on alert list" + error);
        console.log(error);
      });
    }
    
    function updateAlert(id, source, date, type, title, desc) {
      
      var port = $('#port').val();
      var server = $('#server').val();
      var url = 'http://' + server + ':' + port + '/api/alert/' + id;

      var alertUpdated = {
        _id: id,
        source: source,
        date: date,
        type: type,
        title: title,
        description: desc,
        read: 'true'
      };
      
      console.log(alertUpdated);

      $.ajax({
          url: url,
          data: alertUpdated,
          type: 'put',                   
          dataType: 'json',

          beforeSend: function() {
              // This callback function will trigger before data is sent
              $.mobile.loading( 'show');
          },
          complete: function() {
              // This callback function will trigger on data sent/received complete
              $.mobile.loading( 'hide');
          },
          success: function (request, result) {
              //alert('Cambio realizado satisfactoriamente');
          },
          error: function (request, error) {
              // This callback function will trigger on unsuccessful action
              console.log(error);
              alert('Ocurrio un problema en la red intentelo nuevamente');
          }
      });
    }