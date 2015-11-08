var app = angular.module('webApp', ['ngRoute', 'ngI18n']);
var SERVER_URL = 'http://localhost:3000';
var PAGE_URL = 'http://localhost/jarvis/web/app';

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

app.value('ngI18nConfig', {
  defaultLocale: 'english',
  supportedLocales: ['english', 'spanish'],
  basePath: PAGE_URL + '/i18n',
  cache: true
});

app.factory('socket', function () {
  var socket = io.connect(SERVER_URL);
  return socket;
});

app.factory('ItemService', [
  function () {
    var _total = 50;
    return {
      get: function (start, limit, data) {
        var _i, _items = new Array();

        for (_i = start; _i < start + limit; _i += 1) {
          _items.push(data[_i]);
        }

        return {
          items: _items,
          start: start,
          limit: limit,
          total: _total
        };
      },
      initalValues: function (totalItems) {
        
        if (totalItems)
          _total = totalItems;
        
        return {
          start: 1,
          limit: 7,
          total: _total
        };
      }
    };
  }
]);

app.factory('Session', function($http){
  
  var Session = {
    
    data: {},
    updateSession: function(username) {
      
      Session.data = username;
      console.log('username inside factory', username);
    },
    getSession: function() {
      return Session.data;
    }
  };
  
  return Session;
});

app.controller('MainController', ['$scope', 
  'ngI18nResourceBundle', '$location', '$http', function($scope, ngI18nResourceBundle, $location, $http) {
    $scope.setRoute = function(route, $event) {
      $location.path(route);

      if ($event) {
        var item = $($event.target).closest('li');
        item.siblings().removeClass('active');
        item.addClass('active');
        document.title = item.context.text;
      }
   };

   $scope.languages = [
        { locale: "english" },
        { locale: "spanish" }
    ];
    
    $scope.i18n = { language: $scope.languages[0] };
    
    $scope.$watch('i18n.language', function(language) {
        ngI18nResourceBundle.get({locale: language.locale}).success(function (resourceBundle){
            $scope.resourceBundle = resourceBundle;
        });
    });
    
    //Load Settings in order to apply on main page
    $.urlParam = function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results === null) {
         return null;
      }
      else {
         return results[1] || 0;
      }
    };

    var email = $.urlParam('user');
    if (email !== '' && email !== undefined) {
      
      $http.get(SERVER_URL + '/api/user/' + email)
      .then(function(result) {
        var settings = result.data.settings;
        $scope.setLanguage(settings.language);
      });
    }
    //Load Settings to main configurations
    
    $scope.switchLanguage = function(language) {
      ngI18nResourceBundle.get({ locale: language.currentTarget.innerText }).success(function (resourceBundle){
        $scope.resourceBundle = resourceBundle;
        var languageButton = $('#language-setting-button');
        languageButton.val(language.currentTarget.innerText);
        languageButton.html(language.currentTarget.innerText);
        languageButton.trigger('input');
      });
    };
    
    $scope.setLanguage = function(language) {
      ngI18nResourceBundle.get({ locale: language}).success(function (resourceBundle){
        $scope.resourceBundle = resourceBundle;
      });
    };

   $scope.displayChartSensor = function(resourceBundle) {
     var alertsbySensor = [];
      $http.get(SERVER_URL + '/api/alert/querysensor')
        .then(function(result) {
          alertsbySensor = result.data;

          $('#chart-container-left').highcharts({
              chart: {
                type: 'bar'
              },
              title: {
                //text: 'Alerts by Sensor'
                text: 'Alertas por Sensor'
                //text: resourceBundle.alertsByType
              },
              xAxis: {
                //categories: ['Unknow','Information', 'Warning', 'Danger']
                categories: ['Desconocido','Informacion', 'Advertencia', 'Peligro']
                //categories: [resourceBundle.categories.unknow, resourceBundle.categories.information, 
                //  resourceBundle.categories.warning, resourceBundle.categories.danger]
              },
              yAxis: {
                title: {
                    //text: 'Alerts'
                    text: 'Alertas'
                    //text: resourceBundle.alerts
                }
              },
              series: alertsbySensor
          });
        });
   };
   
   $scope.displayChartType = function() {
     $http.get(SERVER_URL + '/api/alert')
      .then(function(result) {
      var alerts = 0;
      alerts = result.data;
      var danger = 0;
      var information = 0;
      var warning = 0;
      var unknow = 0;

      alerts.forEach(function (item, index) {

        if (item.type === 'danger') danger++;
        else
          if (item.type === 'warning') warning++;
          else
            if (item.type === 'info') information++;
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
              //text: 'Alerts by type'
              text: 'Alertas por tipo'
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
//                  ['Information', information],
//                  ['Unknow',   unknow],
//                  ['Warning', warning],
//                  ['Danger', danger]
                  ['Informacion', information],
                  ['Desconocidos',   unknow],
                  ['Advertencia', warning],
                  ['Peligro', danger]
              ]
          }]
      });
    });    
   };

   $scope.loadSummaryData = function(resourceBundle) {

   $.urlParam = function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results === null) {
         return null;
      }
      else {
         return results[1] || 0;
      }
    };

    var email = $.urlParam('user');
    if (email !== '' && email !== undefined) {
      
      $http.get(SERVER_URL + '/api/user/' + email)
      .then(function(result) {
        var settings = result.data.settings;
        if (settings.chartType) {
          $scope.displayChartType(resourceBundle);
        }

        if (settings.chartSensor) {
          $scope.displayChartSensor(resourceBundle);
        }
      });
    }
  };

}]);

app.controller('UserController', function($scope, $http, $window, Session) {

  $scope.users = [];
  $scope.user = null;

  $scope.loadUsers = function() {
    $http.get(SERVER_URL + '/api/user')
     .then(function(result) {
       $scope.users = result.data;
    });
  };

  $scope.loginUser = function() {
    $scope.user = {
      username: $scope.username,
      password: $scope.password
    };
    
    $http({
    	method: 'POST',
    	url: SERVER_URL + '/api/user/login',
    	data: $scope.user
    }).
    success(function (data, status, headers, config) {
      console.log('data-login', data);
      Session.updateSession($scope.username);
      $window.location.href = 'partial/user/index.html?user='+ $scope.username + '&token=' + data.token;
    }).
    error(function (data, status, headers, config) {
      console.log(data);
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
  };

  $scope.logoutUser = function() {
    $scope.user = {
      username: $scope.user.email,
      token: $scope.user.token
    };

    $http({
      method: 'POST',
      url: SERVER_URL + '/api/user/logout',
      data: $scope.user
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      $window.location.href = '../../index.html';
    }).
    error(function (data, status, headers, config) {
      console.log(data);
    });
  };

  $scope.newUser = function() {
    $scope.user = {
      name: $scope.name,
      email: $scope.email,
      password: $scope.password,
      confirmation: $scope.confirmation
    };

    $http({
      method: 'POST',
      url: SERVER_URL + '/api/user/create',
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
  };

  $scope.loadUserInformation = function() {

    $.urlParam = function(name) {
      var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
      if (results === null) {
         return null;
      }
      else {
         return results[1] || 0;
      }
    };

    var email = $.urlParam('user');
    $http.get(SERVER_URL + '/api/user/' + email)
    .then(function(result) {
      $scope.user = result.data;
    });
  };
  
  $scope.selectAll = function(event) {
    var items = $('[type=checkbox]');
    if (event.target.checked) {
      
      items.prop("checked", true);
    } else {
      items.prop("checked", false);
    }
  };
  
  $scope.deleteUser = function() {
    var items = $('input:checked').not('#selectall');
    items.each(function (index, item){
      $http.delete('http://localhost:3000/api/user/' + item.id).
      success(function (data, status, headers, config) {
        if (status === 200) {
          $('#user-deleted').addClass('show');
          $('#user-deleted').removeClass('hidden');

          $('#user-error').addClass('hidden');
          $('#user-error').removeClass('show');

          return;
        }
      }).
      error(function (data, status, headers, config) {
        if (status === 500) {
            $('#user-error').addClass('show');
            $('#user-error').removeClass('hidden');

            $('#user-deleted').addClass('hidden');
            $('#user-deleted').removeClass('show');
            return;
        }
      });
    }); 
  };
  
  $scope.checkUser = function(event) {
    event.stopPropagation();
  };
});

app.controller('AlertController', function($scope, $http, $location) {

  $scope.loadnoReadAlerts = function () {
    $http.get(SERVER_URL + '/api/alert/status/false')
    .then(function(result) {
      var noReads = 0;
      noReads = result.data;
      $scope.danger = 0;
      $scope.information = 0;
      $scope.warning = 0;
      $scope.unknow = 0;
      $scope.done = 0;

      noReads.forEach(function (item, index) {
        if (item.type === 'danger') $scope.danger++;
        else
          if (item.type === 'warning') $scope.warning++;
          else
            if (item.type === 'info') $scope.information++;
            else
              $scope.unknow++;
      });
    });
  };  

  $scope.loadAlerts = function() {
    $http.get(SERVER_URL + '/api/alert')
     .then(function(result) {
       $scope.alerts = result.data;
    });
  };
  
  $scope.selectAll = function(event) {
    var items = $('[type=checkbox]');
    if (event.target.checked) {
      
      items.prop("checked", true);
    } else {
      items.prop("checked", false);
    }
  };
  
  $scope.deleteAlert = function() {
    var items = $('input:checked').not('#selectall');
    items.each(function (index, item){
      $http.delete(SERVER_URL + '/api/alert/' + item.id).
      success(function (data, status, headers, config) {
        if (status === 200) {
          $('#alert-deleted').addClass('show');
          $('#alert-deleted').removeClass('hidden');

          $('#alert-error').addClass('hidden');
          $('#alert-error').removeClass('show');
          window.location.reload(true);

          return;
        }
      }).
      error(function (data, status, headers, config) {
        if (status === 500) {
            $('#alert-error').addClass('show');
            $('#alert-error').removeClass('hidden');

            $('#alert-deleted').addClass('hidden');
            $('#alert-deleted').removeClass('show');
            return;
        }
      });
    }); 
  };
  
  $scope.updateAlert = function() {

    $http({
      method: 'PUT',
      url: SERVER_URL + '/api/alert/' + $scope.alert._id,
      data: $scope.alert
    }).
    success(function (data, status, headers, config) {
      console.log(data);
      console.log('alert updated');
    }).
    error(function (data, status, headers, config) {
      console.log('error updating alert');
      console.log(data);
    });
  };
  
  $scope.displayAlert = function(event, alert) {
    $scope.alert = alert;
    
    if ($scope.alert.read === false) {

      $scope.alert.read = true;
      $scope.updateAlert();
    }

    $('#alertModal').modal('show');
  };

  $scope.checkAlert = function(event) {
    event.stopPropagation();
  };
  
  $scope.filterAlerts = function(event) {
    var type = event.target.innerText;
    var value = $(event.target).attr('ng-value');
    
    $('#button-filter-alert').html(type);
    $('#type-alert-hide').val(value);
    $('#type-alert-hide').change();
  };
});

app.controller('SensorController', function($scope, $http) {

  $scope.newSensor = function() {
    $scope.sensor = {
      name: $scope.name,
      address: $scope.address,
      description: $scope.description
    };
    
    $http({
      method: 'POST',
      url: SERVER_URL + '/api/sensor/create',
      data: $scope.sensor
    }).
    success(function (data, status, headers, config) {
      alert('Sensor Created');
      $scope.name = '';
      $scope.address = '';
      $scope.description = '';
    }).
    error(function (data, status, headers, config) {
      console.log('error');
      console.log(data);
    });
  };

  $scope.sensors = [];
  $scope.loadSensors = function() {
    $http.get('http://localhost:3000/api/sensor')
     .then(function(result) {
       $scope.sensors = result.data;
    });
  };
  
  $scope.selectAll = function(event) {
    var items = $('[type=checkbox]');
    if (event.target.checked) {
      
      items.prop("checked", true);
    } else {
      items.prop("checked", false);
    }
  };
  
  $scope.deleteSensor = function() {
    var items = $('input:checked').not('#selectall');
    console.log(items);
    items.each(function (index, item){
      $http.delete('http://localhost:3000/api/sensor/' + item.id).
      success(function (data, status, headers, config) {
        if (status === 200) {
          $('#sensor-deleted').addClass('show');
          $('#sensor-deleted').removeClass('hidden');

          $('#sensor-error').addClass('hidden');
          $('#sensor-error').removeClass('show');

          return;
        }
      }).
      error(function (data, status, headers, config) {
        if (status === 500) {
            $('#sensor-error').addClass('show');
            $('#sensor-error').removeClass('hidden');

            $('#sensor-deleted').addClass('hidden');
            $('#sensor-deleted').removeClass('show');
            return;
        }
      });
    }); 
  };
  
  $scope.displaySensor = function(event, sensor) {
    $scope.sensor = sensor;

    $('#sensorModal').modal('show');
  };
  
  $scope.checkSensor = function(event) {
    event.stopPropagation();
  };
});

app.controller('SettingsController', function($scope, $http, Session) {

  var email = $('input#emailUser').val();
  $scope.loadUserSettings = function() {
    
    if (email !== '' && email !== undefined) {
      
      $http.get(SERVER_URL + '/api/user/' + email)
      .then(function(result) {
        $scope.settings = result.data.settings;
      
          if($scope.settings.allAlerts) {
        
            $scope.enableCheckboxes();
          } else {

            $scope.disableCheckboxes();
          }
      
        $('#checkAllAlerts').on('click', function(event){
          event.stopPropagation();
          
          if($scope.settings.allAlerts) {
        
            $scope.enableCheckboxes();
          } else {

            $scope.disableCheckboxes();
          }
        });
      
      });
    }
  };
  
  $scope.enableCheckboxes = function() {
    
    $('#checkUnknowAlerts').prop('disabled', false);
    $('#checkInfoAlerts').prop('disabled', false);
    $('#checkWarningAlerts').prop('disabled', false);
    $('#checkDangerAlerts').prop('disabled', false);
  };
  
  $scope.disableCheckboxes = function() {

    $('#checkUnknowAlerts').prop('disabled', true);
    $('#checkInfoAlerts').prop('disabled', true);
    $('#checkWarningAlerts').prop('disabled', true);
    $('#checkDangerAlerts').prop('disabled', true);
  };

  $scope.saveSettings = function() {
    if (email !== '') {

      settings = {
        email: email,
        allAlerts: $scope.settings.allAlerts,
        unknowAlerts: $scope.settings.unknowAlerts,
        informationAlerts: $scope.settings.informationAlerts,
        warningAlerts: $scope.settings.warningAlerts,
        dangerAlerts: $scope.settings.dangerAlerts,
        chartSensor: $scope.settings.chartSensor,
        chartType: $scope.settings.chartType,
        language: $('#language-setting-button').val()
      };

      $http({
        method: 'POST',
        url: SERVER_URL + '/api/user/settings',
        data: settings
      }).
      success(function (data, status, headers, config) {
        if (status === 200) {
          $('#settings-saved').addClass('show');
          $('#settings-saved').removeClass('hidden');

          $('#settings-error').addClass('hidden');
          $('#settings-error').removeClass('show');
          return;
        }
      }).
      error(function (data, status, headers, config) {
        if (status === 500) {
            $('#settings-error').addClass('show');
            $('#settings-error').removeClass('hidden');

            $('#settings-saved').addClass('hidden');
            $('#settings-saved').removeClass('show');
            return;
        }
      });
    }
  };
});

app.controller('PaginationController', ['$scope', 'ItemService', '$http', function ($scope, itemService, $http) {
  
    var _initalValues = itemService.initalValues(),
  _lastPage = Math.ceil(_initalValues.total / _initalValues.limit),
  _pagesArray = function (maxPages) {
    var _arr = new Array(),
    _i;

    for (_i = 1; _i <= maxPages; _i += 1) {
      _arr.push(_i);
    }
    return _arr;
  },
  _updateItems = function () {
    $http.get(SERVER_URL + '/api/alert')
     .then(function(result) {
         var data = result.data.reverse();
        $scope.alerts = angular.copy(itemService.get($scope.current, _initalValues.limit, data).items);
    });
  },

  _updateNextPrev = function () {
    $scope.isNextDisabled = false;
    $scope.isPrevDisabled = false;
    if ($scope.current === 1) {
        $scope.isPrevDisabled = true;
    }
    if ($scope.current === _lastPage) {
        $scope.isNextDisabled = true;
    }
  };

  // initialize
  $scope.pages = _pagesArray(_lastPage);
  $scope.current = _initalValues.start;

  $scope.prev = function () {
    if (!$scope.isPrevDisabled) {
      $scope.current -= 1;
      _updateNextPrev();
      _updateItems();
    }
  };

  $scope.next = function () {
    if (!$scope.isNextDisabled) {
      $scope.current += 1;
      _updateNextPrev();
      _updateItems();
    }
  };

  $scope.goto = function (page) {
    $scope.current = page;
    _updateNextPrev();
    _updateItems();
  };
  _updateNextPrev();
  _updateItems();  
}]);

app.controller('LoginPageController', ['$scope', 
  'ngI18nResourceBundle', '$location', function($scope, ngI18nResourceBundle, $location) {
    
    $scope.languages = [
        { locale: "english" },
        { locale: "spanish" }
    ];
    
    $scope.i18n = { language: $scope.languages[0] };
    
    $scope.$watch('i18n.language', function(language) {
        ngI18nResourceBundle.get({locale: language.locale}).success(function (resourceBundle){
            $scope.resourceBundle = resourceBundle;
        });
    });
    
    $scope.setLanguage = function(language) {
      ngI18nResourceBundle.get({ locale: language}).success(function (resourceBundle){
        $scope.resourceBundle = resourceBundle;
      });
    };   
    
    $scope.signup = function() {

      $('#userModal').modal('show');
    };
  }]);
