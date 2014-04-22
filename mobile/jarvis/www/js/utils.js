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
                  alert('Network error has occurred please try again');
                }
            });                   
    } else {
        alert('Please verify if all fields are fill');
    }
}

