'use strict';

angular.module('myApp.controllers', [])
.controller('itemListCtrl', ['$scope', '$location', '$filter', 'getData', 'sharedProperties', function($scope, $location, $filter, getData, sharedProperties) {

	$scope.filterOptions ={"types":{"cd":true,"dvd":true,"ebook":true}, "activeOnly":true};
	$scope.sortOptions = ['title', 'id', 'discourseDate', 'type'];
	$scope.selectedSortOption = $scope.sortOptions[0];

	$scope.showEditItemView = function(item){
		sharedProperties.setEditItem(item);
		$location.path('/edit-item');
	}

	$scope.showCreateItemView = function(){
		$location.path('create-item');
	}


	var promise = getData.getAll();
	promise.then(
		function(payload) { 
			$scope.items=payload.data;
		},
		function(errorPayload) {
			$log.error('failure loading test data', errorPayload);
		});
	
	

	
}])
.controller('editItemCtrl', ['$scope', '$location', 'sharedProperties', function($scope, $location, sharedProperties){
	$scope.item=sharedProperties.getEditItem();
	$scope.itemCopy = angular.copy($scope.item);
	$scope.editMode = false;
	$scope.edits ={};

	$scope.toggleEditMode = function(bool){
		$scope.editMode = bool;
		if(!bool){
			$scope.itemCopy = angular.copy($scope.item);
		}
	}

	$scope.addEdit = function(key, value){
		$scope.edits[key] = value;
	}
	$scope.saveEdit = function(){
		for(var key in $scope.edits){
			console.log(key + " : " + $scope.edits[key]);
		}
	}

	$scope.deleteItem = function(){
		alert("shit got deleted yo!");
		$location.path("/item-list")
	}

	if($scope.item==null){
		//protocol for new item creation.
	}
}])
.controller('createItemCtrl', ['$scope', '$location', 'sharedProperties', function($scope, $location, sharedProperties){
	$scope.itemType = "cd";
	$scope.templates = sharedProperties.getTemplate();
	$scope.newItem = $scope.templates[$scope.itemType].newEntry;

	$scope.saveNew = function(){
		//send new Item to API
		alert("you've created a new item!");
		sharedProperties.setEditItem($scope.newItem);
		$location.path('/edit-item');
	}

}]);







;