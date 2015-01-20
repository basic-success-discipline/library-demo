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

	$scope.updateActive = function(item, isChecked){
		if(isChecked){
			item.active=1;
		}else{
			item.active=0;
		}
		//when i've got endpoints its just a matter of updating the active field.
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
.controller('editItemCtrl', ['$scope', '$location',  'sharedProperties', function($scope, $location, sharedProperties){
	$scope.item=sharedProperties.getEditItem();
	$scope.createMode = false;
	$scope.editMode = false;
	$scope.itemType = "cd";

	if ($scope.item == null){
		$scope.createMode = true;
		$scope.editMode = true;
		var template = angular.copy(sharedProperties.getTemplate());
		$scope.item = template[$scope.itemType].newEntry;
	}
	$scope.itemCopy = angular.copy($scope.item);
	$scope.tracksCopy = angular.copy($scope.item['tracks']);
	$scope.edits ={};
	$scope.tracksEdited = false;


	$scope.deleteTrack = function(track){
		updateTracksEdited(true);
		for (var i =0; i<$scope.tracksCopy.length; i++){
			if($scope.tracksCopy[i].trackID = track.trackID){
				delete $scope.tracksCopy[i];
			}
		}
	}
	$scope.updateFields = function(type){
		if($scope.createMode){
			$scope.itemType=type;
			var template = angular.copy(sharedProperties.getTemplate());
			$scope.item = template[$scope.itemType].newEntry;
			$scope.itemCopy = angular.copy($scope.item);
		}
	};
	$scope.saveNew = function(){
		//send new Item to API
		alert("you've created a new item!");
		$scope.createMode =false;
		$scope.editMode = false;
		//get edit item from server
		//set as edit item
		//begin again as if just entered edit item view
		$scope.itemsCopy =  angular.copy($scope.item);
		$scope.tracksCopy = angular.copy($scope.item['tracks']);
		$scope.edits ={};
		$scope.tracksEdited = false;
	}

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
		var template = angular.copy(sharedProperties.getTemplate());
		var newTrack = template[$scope.itemType].newTrack;
		newTrack['id'] = Math.floor((Math.random()*100000)+1);
		$scope.tracksCopy.push(newTrack);
		$scope.updateTracksEdited(true);
	}
	$scope.filteroutTracks = function(obj){
		 var result = angular.copy($scope.itemCopy);
		 delete result["tracks"];
    	return result;
	}


	$scope.runtimeFormat = function(rtstring){
		return rtstring.split(":");

	}
}]);





