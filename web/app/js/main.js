var app = angular.module('webApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.
      when('/dashboard', { templateUrl:'../alert/summary.html' }).
      when('/alert', { templateUrl: '../alert/list.html'}).
      when('/sensor', { templateUrl: '../sensor/list.html'}).
      when('/newSensor', { templateUrl: '../sensor/new.html'}).
      when('/setting', { templateUrl: '../setting/index.html'}).
      when('/user', { templateUrl: '../user/list.html'}).
      when('/newUser', { templateUrl: '../user/new.html'}).
      otherwise({ redirectTo: '/', templateUrl: '../alert/summary.html' });
});

// app.factory('socket', function () {
//   var socket = io.connect('http://localhost:3000');
//   return socket;
// });

app.controller('MainController', function($scope, $location, $http) {
    $scope.setRoute = function(route, $event) {
      $location.path(route);

      if ($event) {
        var item = $($event.target).closest('li');
        item.siblings().removeClass('active');
        item.addClass('active');
      }
   }

   $scope.loadSummaryData = function() {

    var alertsNoRead = 0;
    $http.get('http://localhost:3000/api/alert/noread')
        .then(function(result) {
          console.log('result',result);
          alertsNoRead = result.data;
        });

        console.log(alertsNoRead);

    var alertsbySensor = [];
    $http.get('http://localhost:3000/api/alert/querysensor')
        .then(function(result) {
          alertsbySensor = result.data;
        });

        console.log(alertsbySensor);

    $('#chart-container-left').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Alerts by Sensor'
        },
        xAxis: {
            categories: ['172.21.2.12', '10.0.0.11', '172.30.21.1']
        },
        yAxis: {
            title: {
                text: '1 Month'
            }
        },
        series: [{
            name: '172.21.2.12',
            data: [1, 0, 4]
        }, {
            name: '10.0.0.11',
            data: [5, 7, 3]
        }]
    });

    $('#chart-container-right').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: 'Alerts by type in the last 30 days'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
  }
});

app.controller('UserController', function($scope, $http, $window) {

  $scope.users = [];
  $scope.loadUsers = function() {
    $http.get('http://localhost:3000/api/user')
     .then(function(result) {
       $scope.users = result.data;
    });
  }

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
      console.log('login success');
      $window.location.href = 'partial/user/index.html';
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
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
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
      console.log('new user success');
      alert('User Created');
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

// app.controller('PlanetController', function($scope, $http) {

//   $scope.newPlanet = function() {
//     $scope.planet = {
//       name: $scope.name,
//       type: $scope.type,
//       temperature: $scope.temperature,
//       sky: $scope.sky,
//       longNight: $scope.longNight,
//       uv: $scope.uv
//     }
    
//     $http({
//       method: 'POST',
//       url: 'http://localhost:3000/api/planet/create',
//       data: $scope.planet
//     }).
//     success(function (data, status, headers, config) {
//       console.log(data);
//       console.log('success');
//       alert('Planet Created');
//       $scope.name = '';
//       $scope.type = '';
//       $scope.temperature = '';
//       $scope.sky = '';
//       $scope.longNight = '';
//       $scope.uv = '';
//     }).
//     error(function (data, status, headers, config) {
//       console.log('error');
//       console.log(data);
//     });
//   }

//   $scope.planets = [];
//   $scope.loadPlanets = function() {
//     $http.get('http://localhost:3000/api/planet')
//      .then(function(result) {
//        $scope.planets = result.data;
//     });
//   }

//   $scope.goNewPlanet = function() {
//     window.location = 'new.html';
//   }

// });


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
      $scope.address = '';
      $scope.description = '';
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

});