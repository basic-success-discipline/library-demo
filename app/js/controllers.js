'use strict';

angular.module('myApp.controllers', [])
.controller('homeCtrl', ['$scope', function($scope) {
	
}])
.controller('cdsCtrl', ['$scope', 'getData', function($scope, getData) {

	var promise = getData.getData();
	 promise.then(
          function(payload) { 
              $scope.items = payload.data;
          },
          function(errorPayload) {
              $log.error('failure loading test data', errorPayload);
          });


}])
.controller('dvdsCtrl', ['$scope', function($scope) {

}]);