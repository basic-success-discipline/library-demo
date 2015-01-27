'use strict';

angular.module('myApp.pubStruct', ['ui.sortable'])
.controller('pubStructCtrl', ['$scope', 'getData', function($scope, getData){
	
	var getItems= function(){
	var promise = getData.getAll();
		promise.then(
			function(payload){
				$scope.items=payload.data;
				getStruct();
			},
			function(errorPayload){
				$log.error('failure loading data', errorPayload);
			});
	}

	var getStruct = function(){
		var promise = getData.getPubStruct();
		promise.then(
			function(payload) { 
				$scope.ps=payload.data;
				$scope.categories=$scope.ps["Categories"];
			},
			function(errorPayload) {
				$log.error('failure loading publication structure', errorPayload);
			});
	}


	getItems();
	

}])
.filter('pubStructFilter', function(){


	return function (ids, items){
		var filtered = [];
		angular.forEach(ids, function(id){
					for(var i=0; i<items.length; i++){
						var item = items[i];
						if(item["id"] == id){
							filtered.push(item["title"]);
						}
					}
				});
				return filtered;
			}
		
})

.directive('recursiveStructure', function(recursionHelper) {
	return {
		restrict: 'E',
		required: 'category',
		scope:{
			category: "=",
			items: "="
		},

		templateUrl: 'pub-struct/recursive-structure.html',
		compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return recursionHelper.compile(element);
        }
    }
});