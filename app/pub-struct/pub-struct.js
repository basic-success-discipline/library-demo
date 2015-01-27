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

}])


.directive('recursiveStructure', function(recursionHelper) {
  return {
    restrict: 'E',
    required: 'category',
    scope:{
    	category: "="
    },
    templateUrl: 'pub-struct/recursive-structure.html',
    compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return recursionHelper.compile(element);
        }
  }
});