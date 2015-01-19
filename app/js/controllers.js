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
	$scope.tracksCopy = angular.copy($scope.item['tracks']);
	$scope.editMode = false;
	$scope.edits ={};
	$scope.tracksEdited = false;


	$scope.toggleEditMode = function(bool){
		$scope.editMode = bool;
		if(!bool){
			$scope.itemCopy = angular.copy($scope.item);
			$scope.tracksCopy = angular.copy($scope.item['tracks']);
			$scope.updateTracksEdited(false);
		}
	}

	$scope.addEdit = function(key, value){
		$scope.edits[key] = value;
	}
	$scope.saveEdit = function(){
		//only send updates
		for(var key in $scope.edits){
			console.log(key + " : " + $scope.edits[key]);
		} 

		//for tracks array, send whole array with update
		if($scope.tracksEdited){
			console.log("tracks array updated");
		}
	}
	$scope.updateTracksEdited = function(bool){
		$scope.tracksEdited = bool;
	}

	$scope.deleteItem = function(){
		alert("shit got deleted yo!");
		$location.path("/item-list")
	}

	$scope.addNewTrack = function(){
		var template = sharedProperties.getTemplate();
		$scope.tracksCopy.push(template[$scope.itemCopy['type']].newTrack);
		$scope.updateTracksEdited(true);
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





