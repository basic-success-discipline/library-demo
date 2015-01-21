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
	var item = sharedProperties.getEditItem();
	$scope.item = {"obj": item, "copy":""};
	$scope.createMode = false;
	$scope.editMode = false;
	$scope.itemType = "cd";

	if ($scope.item.obj == null){
		$scope.createMode = true;
		$scope.editMode = true;
		var template = angular.copy(sharedProperties.getTemplate());
		$scope.item.obj = template[$scope.itemType].newEntry;
		$scope.item.obj['id'] = Math.floor((Math.random()*100000)+1);
	}
	$scope.edits ={};


	$scope.updateFields = function(type){
		if($scope.createMode){
			$scope.itemType=type;
			var template = angular.copy(sharedProperties.getTemplate());
			$scope.item.obj = template[$scope.itemType].newEntry;
			$scope.refreshEditItemView();
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
		$scope.refreshEditItemView();
		$scope.edits ={};

	}
	$scope.refreshEditItemView = function(){
		$scope.item.copy =  angular.copy($scope.item.obj);
	}

	$scope.toggleEditMode = function(bool){
		$scope.editMode = bool;
		if(!bool){
			$scope.refreshEditItemView();
			$scope.edits={};

		}
		console.log("toggle edit: " + $scope.item.copy["tracks"][0]["filename"]);
	}

	$scope.addEdit = function(key){
		$scope.edits[key] = $scope.item.copy[key];
	}

	$scope.saveEdit = function(){
		//only send updates
		for(var key in $scope.edits){
			console.log(key + " : " + $scope.edits[key]);
		} 
		console.log("save edit: " + $scope.item.copy["tracks"][0]["filename"]);

		//for tracks array, send whole array with update
		if($scope.edits["tracks"]){
			console.log("edited tracks: " + $scope.edits["tracks"][0]["filename"]);
		}
	}

	$scope.deleteItem = function(){
		alert("shit got deleted yo!");
		$location.path("/item-list")
	}


	$scope.refreshEditItemView();

}])

.controller('tracksCtrl', ['$scope', 'sharedProperties', function($scope, sharedProperties){
	

	$scope.addNewTrack = function(){
		var template = angular.copy(sharedProperties.getTemplate());
		var newTrack = template[$scope.itemType].newTrack;
		newTrack['trackId'] = Math.floor((Math.random()*100000)+1);
		$scope.item.copy["tracks"].push(newTrack);
		$scope.addEdit('tracks',$scope.item.copy["tracks"]);
	}

	$scope.deleteTrack = function(track){
		for(var i=0; i<$scope.item.copy["tracks"].length; i++){
			if($scope.item.copy["tracks"][i].trackID == track.trackID){
				delete $scope.item.copy["tracks"][i];
				$scope.addEdit('tracks',$scope.item.copy["tracks"])
			}
		}
	}

}])


;





