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

    var alertsbySensor = [];
    $http.get('http://localhost:3000/api/alert/querysensor')
        .then(function(result) {
          alertsbySensor = result.data;
          console.log(alertsbySensor);

          $('#chart-container-left').highcharts({
              chart: {
                type: 'bar'
              },
              title: {
                text: 'Alerts by Sensor'
              },
              xAxis: {
                categories: ['Unknow','Information', 'Warning', 'Danger']
              },
              yAxis: {
                title: {
                    text: 'Alerts'
                }
              },
              series: alertsbySensor
          });
        });

    $http.get('http://localhost:3000/api/alert')
    .then(function(result) {
      var alerts = 0;
      alerts = result.data;
      var danger = 0;
      var information = 0;
      var warning = 0;
      var unknow = 0;

      alerts.forEach(function (item, index) {

        if (item.type == 'danger') danger++;
        else
          if (item.type == 'warning') warning++;
          else
            if (item.type == 'info') information++;
            else
              unknow++;
      });

      $('#chart-container-right').highcharts({
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false
          },
          title: {
              text: 'Alerts by type'
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
                  },
                  colors: ['#7CB5EC', '#EEEEEE', '#ed9c28', '#d43f3a']
              }
          },
          series: [{
              type: 'pie',
              name: 'Alerts by Type',
              data: [
                  ['Information', information],
                  ['Unknow',   unknow],
                  ['Warning', warning],
                  ['Danger', danger]
              ]
          }]
      });
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

  $scope.loadnoReadAlerts = function () {
    $http.get('http://localhost:3000/api/alert/noread')
    .then(function(result) {
      var noReads = 0;
      noReads = result.data;
      $scope.danger = 0;
      $scope.information = 0;
      $scope.warning = 0;
      $scope.unknow = 0;
      $scope.done = 0;

      noReads.forEach(function (item, index) {
        if (item.type == 'danger') $scope.danger++;
        else
          if (item.type == 'warning') $scope.warning++;
          else
            if (item.type == 'info') $scope.information++;
            else
              $scope.unknow++;
      });
    });
  }  

  $scope.alerts = [];
  $scope.loadAlerts = function() {
    $http.get('http://localhost:3000/api/alert')
     .then(function(result) {
       $scope.alerts = result.data;
    });
  }
});

app.controller('SensorController', function($scope, $http) {

  $scope.newSensor = function() {
    $scope.sensor = {
      name: $scope.name,
      address: $scope.address,
      description: $scope.description
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
       $scope.sensors = result.data;
    });
  }

});