//var app = angular.module('webApp', ['ngRoute', 'ngGrid', 'pascalprecht.translate']);
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
      when('/profile', { templateUrl: '../user/profile.html'}).
      when('/help', { templateUrl: '../user/help.html'}).
      otherwise({ redirectTo: '/', templateUrl: '../alert/summary.html' });
});

app.factory('socket', function () {
  var socket = io.connect('http://localhost:3000');
  return socket;
});

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
  $scope.user = null;

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
      $window.location.href = 'partial/user/index.html';
    }).
    error(function (data, status, headers, config) {
      if (status === 500) {

        if (data === 'user-not-found' || data === 'username-password-mismatch') {
          
          $('#login-error').addClass('hidden');
          $('#login-error').removeClass('show');

          $('#login-failed').removeClass('hidden');
          $('#login-failed').addClass('show');

          return;
        }
      }

      $('#login-failed').addClass('hidden');
      $('#login-failed').removeClass('show');

      $('#login-error').removeClass('hidden');
      $('#login-error').addClass('show');
    });
  }

  $scope.logoutUser = function() {
    $scope.user = {
      username: $scope.user.email,
      token: $scope.user.token
    }

    console.log('scope', $scope);
    
    $http({
      method: 'POST',
      url: 'http://localhost:3000/api/user/logout',
      data: $scope.user
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      $window.location.href = '../../index.html';
    }).
    error(function (data, status, headers, config) {
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

  $scope.loadUserInformation = function() {
    $http.get('http://localhost:3000/api/user/gabitosoft@gmail.com')
    .then(function(result) {
      $scope.user = result.data;
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

app.controller('PaginationController', function($scope, $http) {

  $scope.filterOptions = {
    filterText: '',
    useExternalFilter: true
  };

  $scope.setPagingData = function(data, page, pageSize) {
    var pageData = data.slice((page - 1) * pageSize, page * pageSize);
    $scope.myData = pagedData;
    $scope.totalServerItems = data.length;
    if (!$scope.$$phase) {
      $scope.$apply();
    }
  };

  $scope.getPagedDataAsync = function(pageSize, page, searchText) {
    setTimeout(function() {
      var data;
      if (searchText) {
        var ft = searchText.toLowerCase();
        $http.get('http://localhost:3000/api/alert').success(function (largeLoad){
          data = largeLoad.filter(function(item){
            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
          });
          $scope.setPagingData(data, page, pageSize);
        });
      } else {
        $http.get('http://localhost:3000/api/alert').success(function (largeLoad) {
          $scope.setPagingData(largeLoad, page, pageSize);
        });
      }
    }, 100);
  };

  $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

  $scope.$watch('pagingOptions', function(newVal, oldVal) {
    if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
      $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
    }
  }, true);

  $scope.gridOptions = {
    data: 'myData',
    enablePaging: true,
    showFooter: true,
    totalServerItems: 'totalServerItems',
    pagingOptions: $scope.pagingOptions,
    filterOptions: $scope.filterOptions
  };
});