'use strict';

angular.module('myApp.controllers', [])
.controller('mediaCtrl', ['$scope', '$filter', 'getData', function($scope, $filter, getData) {
	$scope.getDataByType = function(type){
	var promise = getData.getAll();
	 promise.then(
          function(payload) { 
              $scope.items = $filter('byType')(payload.data, type);
          },
          function(errorPayload) {
              $log.error('failure loading test data', errorPayload);
          });
	}
}])
.controller('homeCtrl', ['$scope', '$controller', function($scope, $controller) {
	$controller('mediaCtrl', {$scope: $scope});
	$scope.getDataByType('all');
}])
.controller('cdsCtrl', ['$scope', '$controller', function($scope, $controller) {
	$controller('mediaCtrl', {$scope: $scope});
	$scope.getDataByType('cd');


}])
.controller('dvdsCtrl', ['$scope', '$controller', function($scope, $controller) {
	$controller('mediaCtrl', {$scope: $scope});
	$scope.getDataByType('dvd');

}]);