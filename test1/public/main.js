
var angularTodo = angular.module('angularTodo', []);

function mainController($scope, $http){
    $scope.formData = {};

    // When the page is loaded, tha API request all TODOS
    $http.get('/api/todos')
        .success(function (data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data){
            console.log('Error:' + data);
        });

    // When is added a new TODO, the Frontend send the text to the API
    $scope.createTodo = function(){
        $http.post('/api/todos', $scope.formData)
            .success(function(data){
                $scope.formData = {};
                $scope.todos = data;
                console.log(data);
            })
            .error(function(){
                console.log('Error:' + data);
            });
    };

    // Delete a TODO after checked as terminated
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error:' + data);
            });
    };
}
