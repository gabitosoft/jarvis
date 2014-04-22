var app = angular.module('webApp', []);
app.factory('socket', function () {
  var socket = io.connect('http://localhost:3000');
  return socket;
});

app.controller('UserController', function($scope, $http) {
  $scope.loginUser = function() {
    $scope.user = {
      username: $scope.username,
      password: $scope.password
    }
    
    $http({
    	method: 'POST',
    	url: 'http://localhost:3000/api/user/login',
    	data: $scope.user
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('success');
      window.location = 'user/index.html';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  }

  $scope.logoutUser = function() {
    $scope.user = {
      username: $scope.username,
      password: $scope.password
    }
    
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/user/logout',
      data: $scope.UserController
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('success');
      window.location = '../index.html';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  }

  $scope.signinPage = function() {
    window.location = 'user/new.html';
  }

  $scope.newUser = function() {
    $scope.user = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password,
      confirmation: $scope.confirmation
    }
    
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/user/create',
      data: $scope.user
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('success');
      window.location = '../index.html';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  }
});


app.controller('AlertController', function($scope, $http) {

  $scope.alerts = [];
  $scope.loadAlerts = function() {
    $http.get('http://localhost:3000/api/alert')
     .then(function(result) {
       $scope.alerts = result.data;
    });
  }

});


app.controller('PlanetController', function($scope, $http) {

  $scope.newPlanet = function() {
    $scope.planet = {
      name: $scope.name,
      type: $scope.type,
      temperature: $scope.temperature,
      sky: $scope.sky,
      longNight: $scope.longNight,
      uv: $scope.uv
    }
    
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/planet/create',
      data: $scope.planet
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('success');
      alert('Planet Created');
      $scope.name = '';
      $scope.type = '';
      $scope.temperature = '';
      $scope.sky = '';
      $scope.longNight = '';
      $scope.uv = '';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  }

  $scope.planets = [];
  $scope.loadPlanets = function() {
    $http.get('http://localhost:3000/api/planet')
     .then(function(result) {
       $scope.planets = result.data;
    });
  }

  $scope.goNewPlanet = function() {
    window.location = 'new.html';
  }

});


app.controller('SensorController', function($scope, $http) {

  $scope.newSensor = function() {
    $scope.sensor = {
      name: $scope.name,
      planet: $scope.planet
    }
    
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/sensor/create',
      data: $scope.sensor
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('success');
      alert('Sensor Created');
      $scope.name = '';
      $scope.planet = '';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  }

  $scope.sensors = [];
  $scope.loadSensors = function() {
    $http.get('http://localhost:3000/api/sensor')
     .then(function(result) {
      console.log('result', result);
       $scope.sensors = result.data;
    });
  }

  $scope.goNewSensor = function() {
    window.location = 'new.html';
  }

});