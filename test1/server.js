// Server.js

var express = require('express');
var app = express();
var mongoose = require('mongoose');

// Connection with the  database
mongoose.connect('mongodb://localhost:27017/angular-todo');

// Configuration
app.configure(function () {

    // Location of static files
    app.use(express.static(__dirname + '/public'));
    // Display a request on terminal from all request
    app.use(express.logger('dev'));
    // Allow change the html with the POST method
    app.use(express.bodyParser());
    // Simulate DELETE and PUT
    app.use(express.methodOverride());
});

// Defining models
var Todo = mongoose.model('Todo', {
    text: String
});

// Paths to API
// GET for TODOs

app.get('/api/todos', function(req, res) {
    Todo.find(function(err, todos){
        if (err) {
            res.send(err);
        }
        res.json(todos);
    });
});

// POST create a TODO and return all of them after creation
app.post('/api/todos', function(req, res) {
    Todo.create({
        text: req.body.text,
        done: false
    }, function(err, todo){
        if (err) {
            res.send(err);
        }

        Todo.find(function(err, todos) {
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// DELETE a TODO especific and return all of them after delete it
app.delete('/api/todos/:todo', function(req, res){
    Todo.remove({
        _id: req.params.todo
    }, function(err, todo){
        if (err) {
            res.send(err);
        }
        Todo.find(function(err, todos){
            if (err) {
                res.send(err);
            }
            res.json(todos);
        });
    });
});

// Load the main view a simple HTML file where our Single App page will be there
// Angular handle the frontend side
app.get('*', function(req, res){
    res.sendfile('./public/index.html');
});

// Listen on port 8080 and run server
app.listen(8080, function() {
    console.log('App listening on port 8080');
});