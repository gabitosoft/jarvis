
// Hello World!
//
//var http = require('http');
//var s = http.createServer(function (req, res) {
//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World\n');
//});
//s.listen(8000);
//console.log('Server running!');


//var WebSocketServer = require('websocket').server;
//var WebSocketClient = require('websocket').client;
//var WebSocketFrame  = require('websocket').frame;
//var WebSocketRouter = require('websocket').router;

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
   console.log( (new Date())  + 'Received request for' + request.url); 
   response.writeHead(404);
   response.end();
});

server.listen(8080, function() {
    
    console.log( (new Date()) + 'Server is listen on port 8080');
});

wsServer = new WebSocketServer({
    httpServer : server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    
    // Put the logic here to detect whether the specified origin is allowed
    return true;
}

wsServer.on('request', function(request) {
    
    if ( !originIsAllowed(request.origin) ) {

        request.reject();
        console.log( (new Date()) + 'Connection from origin' + request.origin + ' rejected.' );
        return;
    }
    var connection = request.accept('echo-protocol', request.origin);
    console.log( (new Date()) + 'Connection accepted.' );
    connection.on('message', function (message) {

        if (message.type === 'utf8') {

            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        } else if (message.type === 'binary') {

            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });

    connection.on('close', function(reasonCode, description) {

        console.log( (new Date()) + 'Peer ' + connection.remoteAddress + ' disconnected.' );
    });
   
});
