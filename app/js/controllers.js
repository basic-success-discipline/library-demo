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

	$scope.updateActive = function(item, isChecked){
		if(isChecked){
			item.active=1;
		}else{
			item.active=0;
		}
		//when i've got endpoints its just a matter of updating the active field.
	}

	$scope.sayHello = function(){
		$scope.greeting="Hello, world";
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

	$scope.itemType = $scope.item.obj["type"];
	$scope.edits ={"obj":{}};



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
		$scope.edits.obj ={};

	}

	//has test
	$scope.refreshEditItemView = function(){
		$scope.item.copy =  angular.copy($scope.item.obj);
	}

	//has test
	$scope.toggleEditMode = function(bool){
		$scope.editMode = bool;
		if(!bool){
			$scope.refreshEditItemView();
			$scope.edits.obj={};
		}
	}

	//has test
	$scope.addEdit = function(key){
		if($scope.item.copy[key]){
			$scope.edits.obj[key] = $scope.item.copy[key];
		}
	}

	$scope.saveEdit = function(){
		//only send updates
		for(var key in $scope.edits.obj){
			if(key!="tracks"){
				console.log(key + " : " + $scope.edits.obj[key]);
			}else{
				for(var i=0; i<$scope.edits.obj["tracks"].length; i++){
					var track = $scope.edits.obj["tracks"][i];
					console.log(track);
				}
			}
		} 
		$scope.editMode = false;
		$scope.refreshEditItemView();
		$scope.edits.obj={};

	}


	$scope.unsavedEdits = function(){
		for(var prop in $scope.edits.obj) { 
			return true;
		}
		return false;
	}

	$scope.deleteItem = function(){
		var retVal = confirm("Deleting entry \n\nTHIS CANNOT BE UNDONE \n\n" + "Deactivating is the safer option.");
		if(retVal){
			alert("shit got deleted yo!");
			$location.path("/item-list")
		}
		
	}


	$scope.confirmLeaveEdit = function(){
		if($scope.editMode && $scope.unsavedEdits()){
			var retVal = confirm("Leaving edit view with unsaved changes.");
			if(retVal){
				$location.path("/item-list");
			}	
		}else{
			$location.path("/item-list");
		}
	}


	$scope.refreshEditItemView();

}])

.controller('tracksCtrl', ['$scope', 'sharedProperties', function($scope, sharedProperties){
	


	$scope.addNewTrack = function(){
		var template = angular.copy(sharedProperties.getTemplate());
		var newTrack = template[$scope.itemType].newTrack;
		newTrack['trackID'] = Math.floor((Math.random()*100000)+1);
		$scope.item.copy["tracks"].push(newTrack);
		$scope.addEdit('tracks',$scope.item.copy["tracks"]);
	}

	$scope.deleteTrack = function(track){

		for(var i=0; i<$scope.item.copy["tracks"].length; i++){
			if($scope.item.copy["tracks"][i].trackID == track.trackID){
				$scope.item.copy["tracks"].splice(i,1);
				$scope.addEdit('tracks',$scope.item.copy["tracks"])

			}
		}
	}

	$scope.addEdit = function(key){
		$scope.edits.obj['tracks'] = $scope.item.copy['tracks'];
	}

}])

.controller('trackCtrl', ['$scope', function($scope){
	$scope.bindItem= $scope.track;
}])


.controller('publicationStructureCtrl', ['$scope', function($scope){
	
}])
;








