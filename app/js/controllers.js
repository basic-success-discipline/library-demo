'use strict';

angular.module('myApp.controllers', [])
.controller('itemListCtrl', ['$scope', '$location', '$filter', 'getData', 'sharedProperties', function($scope, $location, $filter, getData, sharedProperties) {
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

	$scope.getDataByType('all');
	$scope.showEditItemView = function(id){
		sharedProperties.setID(id);
		$location.path('/edit-item');
	}
}])
.controller('editItemCtrl', ['$scope', 'sharedProperties', function($scope, sharedProperties){
	$scope.id=sharedProperties.getID();
}]);