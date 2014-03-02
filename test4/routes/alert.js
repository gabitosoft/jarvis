// Paths to API
module.exports = function (app) {
  app.post('/api/alert', function(req, res) {
    //curl -d '{"key":"This is an alert test"}' -H "Content-Type: application/json" http://localhost:8081/api/alert
    console.log(req.body);
    console.log('request =' + JSON.stringify(req.body));
    app.connections[0].emit('message', { message: req.body.key });
    res.send(200);
  });
};