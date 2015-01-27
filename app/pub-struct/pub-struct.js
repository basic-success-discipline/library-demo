'use strict';

angular.module('myApp.pubStruct', [])
.controller('pubStructCtrl', ['$scope', 'getData', function($scope, getData){
	

	var promise = getData.getPubStruct();
	promise.then(
		function(payload) { 
			$scope.ps=payload.data;
			console.log($scope.ps);
		},
		function(errorPayload) {
			$log.error('failure loading publication structure', errorPayload);
		});

}]);