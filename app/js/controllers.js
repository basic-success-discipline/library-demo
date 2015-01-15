'use strict';

angular.module('myApp.controllers', [])
.controller('homeCtrl', ['$scope', function($scope) {
	
}])
.controller('cdsCtrl', ['$scope', '$filter', 'getData', function($scope, $filter, getData) {
	var promise = getData.getAll();
	 promise.then(
          function(payload) { 
              $scope.items = $filter('byType')(payload.data, "cd");
          },
          function(errorPayload) {
              $log.error('failure loading test data', errorPayload);
          });


}])
.controller('dvdsCtrl', ['$scope', '$filter', 'getData', function($scope, $filter, getData) {
	var promise = getData.getAll();
	 promise.then(
          function(payload) { 
              $scope.items = $filter('byType')(payload.data, "dvd");
          },
          function(errorPayload) {
              $log.error('failure loading test data', errorPayload);
          });

}]);