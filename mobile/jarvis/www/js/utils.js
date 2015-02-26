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

function login() {
  var port = $('#port').val();
	var server = $('#server').val();
	var usr = $('#username').val();
	var pwd = $('#password').val();
	if(server.length > 0 && usr.length > 0 && pwd.length > 0 && port.length > 0) {
        // Send data to server through the ajax call
        // action is functionality we want to call and outputJSON is our data
            console.log('http://' + server + ':' + port + '/api/user/login');
            $.ajax({
                url:  'http://' + server + ':' + port + '/api/user/login',
                data: { username : usr, password: pwd },
                type: 'post',                   
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
                    window.location.href = '#alerts';
                    init();
                },
                error: function (request, error) {
                    // This callback function will trigger on unsuccessful action
                  alert('Ocurrio un error en la red por favor intentelo nuevamente');
                }
            });                   
    } else {
        alert('Por favor verifique que todos los campos sean completados');
    }
}

function fillSensors() {    

    var port = $('#port').val();
    var server = $('#server').val();
    var url = 'http://' + server + ':' + port + '/api/sensor';

    $.getJSON(url, function(data) {

      var listSensors = $('#list-sensors');
      listSensors.empty();
      $.each(data, function(key, value) {
        listSensors.append(
            '<div data-role="fieldcontain">' + 
              '<label for="flip-2">' +
              value.name + ' ( ' + value.address + ')' +
              ' </label>' +
              '<select name="flip-2" id="flip-2" data-role="slider">' +
                '<option value="off">Off</option>' +
                '<option selected value="on">On</option>' +
              '</select>' +
            '</div>').trigger('create');
      });
    }).fail(function(error) {
      alert( "Error on list sensors" + error);
      console.log(error);
    });
}

function loadSettings() {

    var email = $('#username').val();
    var port = $('#port').val();
    var server = $('#server').val();
    var url = 'http://' + server + ':' + port + '/api/user/' + email;
      console.log(url);      
    $.getJSON(url, function(data) {

      
//      $('#flip-2').val('on').attr('selected', data.settings.allAlerts).siblings('option').removeAttr('selected');
//      $('#flip-2').selectmenu();
//      $('#flip-2').selectmenu('refresh', true);
//      
//      $('#flip-3').val('on').attr('selected', data.settings.informationAlerts).siblings('option').removeAttr('selected');
//      $('#flip-4').val('on').attr('selected', data.settings.warningAlerts).siblings('option').removeAttr('selected');
//      $('#flip-5').val('on').attr('selected', data.settings.dangerAlerts).siblings('option').removeAttr('selected');
//      $('#flip-6').val('on').attr('selected', data.settings.unknowAlerts).siblings('option').removeAttr('selected');

    }).fail(function(error) {
      alert( "Error al cargar configuraciones" + error);
      console.log(error);
    });
}

function saveSettings() {

    var settings = {
      email: $('#userEmail').val(),
      allAlerts: $('#flip-2').val(),
      informationAlerts: $('#flip-3').val(),
      warningAlerts: $('#flip-4').val(),
      dangerAlerts: $('#flip-5').val(),
      unknowAlerts: $('#flip-6').val()
    };

    var serverUrl = 'http://' + $('#serverUrl').text() + '/api/user/settings';

    $.ajax({
        url: serverUrl ,
        data: settings,
        type: 'post',                   
        dataType: 'json',
        
        beforeSend: function() {
            // This callback function will trigger before data is sent
            $.mobile.loading( 'show');
        },
        complete: function() {
            // This callback function will trigger on data sent/received complete
            $.mobile.loading( 'hide');
        },
        success: function (result) {
            if(result.token) {
                
                alert('Cambio realizado satisfactoriamente');
            } else {
                alert('Los cambios no se pudieron verificar'); 
            }
        },
        error: function (request, error) {
            // This callback function will trigger on unsuccessful action
            alert('Ocurrio un problema en la red intentelo nuevamente');
        }
    });
}

function logout() {
  console.log('salir');
    window.location.href = '#page-login';
    $('userEmail').val('');
    navigator.app.exitApp();
}