'use strict';

angular.module('myApp.itemList', [])
.controller('itemListCtrl', ['$scope', '$location', '$filter', 'dataModel',function($scope, $location, $filter, dataModel) {
	var domstorage=window.localStorage || (window.globalStorage? globalStorage[location.hostname] : null);
	$scope.filterOptions ={"types":{"cd":true,"dvd":true,"ebook":true}, "activeOnly":false};

	if(domstorage && domstorage.filterOptions){
		$scope.filterOptions = JSON.parse(domstorage.filterOptions);
	}
	$scope.sortOptions = ['title', 'id', 'discourseDate', 'type'];
	$scope.selectedSortOption = $scope.sortOptions[0];
	$scope.items = [];
	dataModel.setDemoViewed("Item List View");
	$scope.demoViews = dataModel.getDemoViews();


	$scope.showEditItemView = function(item){
		$scope.saveFilterOptions();
		dataModel.setEditItem(item);
		$location.path('/edit-item');
	}

	$scope.saveFilterOptions = function(){
		if(domstorage){
			domstorage.filterOptions = JSON.stringify($scope.filterOptions);
		}
	}

	$scope.updateActive = function(item, isChecked){

		var active;
		if(isChecked){
			active = "1";
		}else{
			active = "0";
		} 
		
		var promise = dataModel.updateItem(item, {active:active});
		promise.then(
			function(payload) { 
				item.active = payload.active;
				
			},
			function(errorPayload) {
				console.error('failure setting active on item', errorPayload);
			});
	}

	var getItems = function(){
		var promise = dataModel.getItems();
		promise.then(function(items) { 
			$scope.items=items;
		});
	}

	getItems();
	
	
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