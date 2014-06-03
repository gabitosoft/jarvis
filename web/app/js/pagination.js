app.controller('PaginationController', function($scope, $http) {

  $scope.alerts = [];
  $scope.loadAlerts = function() {
    $http.get('http://localhost:3000/api/alert')
     .then(function(result) {
       $scope.alerts = result.data;
    });
  }

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