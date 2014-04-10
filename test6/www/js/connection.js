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

            var socket = io.connect($('#server').val());
            //var socket = io.connect("http://10.31.48.50:3000");

            socket.on('alert', function (data) {
                $('#alertList').append('<li class="list-group-item-'+ data.type +'" ><a href="#description">' +
                        '<h3 class="list-group-item-heading">' + data.title + '</h3>' +
                        '<p class="list-group-item-text">' + data.description + '</p>' +
                        '<p class="list-group-item-text">' + data.date + '</p>' +
                        '</a></li>'
                );
                socket.emit('message', { message: 'Client was notified' });
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