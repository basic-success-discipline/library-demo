'use strict';

angular.module('myApp.itemList', [])
.controller('itemListCtrl', ['$scope', '$location', '$filter', 'dataModel',function($scope, $location, $filter, dataModel) {

	$scope.filterOptions ={"types":{"cd":true,"dvd":true,"ebook":true}, "activeOnly":true};
	$scope.sortOptions = ['title', 'id', 'discourseDate', 'type'];
	$scope.selectedSortOption = $scope.sortOptions[0];


	$scope.showEditItemView = function(item){
		dataModel.setEditItem(item);
		$location.path('/edit-item');
	}

	$scope.updateActive = function(item, isChecked){
		var promise = dataModel.updateItem(item.id, {active:isChecked});
		promise.then(
			function(payload) { 
				getAllData();
			},
			function(errorPayload) {
				$log.error('failure setting active on item', errorPayload);
			});
	}


	var getAllData = function(){
		var promise = dataModel.getAll();
		promise.then(
			function(payload) { 
				console.log(payload.data);
				$scope.items=payload.data;
			},
			function(errorPayload) {
				$log.error('failure loading test data', errorPayload);
			});
	}

	getAllData();
	
	
}])






.filter('itemListFilter', function(){
	return function (items, filterOptions){
		var filtered = [];

		angular.forEach(items, function(item){
			//type

			if(filterOptions.types[item.type]){
				
				//active
				if(filterOptions.activeOnly){
					if(item.active==1){
						filtered.push(item);
					}
				}else{
					filtered.push(item);
				}
			}
		});
		return filtered;
	}
})


;