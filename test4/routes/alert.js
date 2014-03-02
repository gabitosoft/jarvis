// Paths to API
module.exports = function (app) {
  app.post('/api/alert', function(req, res) {
    //curl -d '{"user":"Gabriel", "key":"This is an alert test"}' -H "Content-Type: application/json" http://localhost:8081/api/alert
    console.log(req.body);
    console.log('request =' + JSON.stringify(req.body));
    var socket = app.connections[req.body.user];
    if (socket !== undefined) {
      socket.emit('message', { message: req.body.key });
    } else {
      res.send(404);
    }

    res.send(200);
  });
};