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
		if(isChecked){
			dataModel.updateItem(item.id, {active:true});
			item.active=1;
		}else{
			dataModel.updateItem(item.id, {active:false});
			item.active=0;
		}
		//when i've got endpoints its just a matter of updating the active field.
	}

	$scope.sayHello = function(){
		$scope.greeting="Hello, world";
	}



	var promise = dataModel.getAll();
	promise.then(
		function(payload) { 
			$scope.items=payload.data;
		},
		function(errorPayload) {
			$log.error('failure loading test data', errorPayload);
		});
	
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