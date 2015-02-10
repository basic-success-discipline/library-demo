'use strict';

angular.module('myApp.editItem', [])
.controller('editItemCtrl', ['$scope', '$location',  'dataModel', function($scope, $location, dataModel){
	var item = dataModel.getEditItem();
	$scope.item = {"obj": item, "copy":""};
	$scope.createMode = false;
	$scope.editMode = false;
	$scope.itemType = "cd";

	if ($scope.item.obj == null){
		$scope.createMode = true;
		$scope.editMode = true;
		var template = angular.copy(dataModel.getTemplate());
		$scope.item.obj = template[$scope.itemType].newEntry;
		$scope.item.obj['id'] = Math.floor((Math.random()*100000)+1);
	}

	$scope.itemType = $scope.item.obj["type"];
	$scope.edits ={"obj":{}};



	$scope.updateFields = function(type){
		if($scope.createMode){
			$scope.itemType=type;
			var template = angular.copy(dataModel.getTemplate());
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

.controller('tracksCtrl', ['$scope', 'dataModel', function($scope, dataModel){
	


	$scope.addNewTrack = function(){
		var template = angular.copy(dataModel.getTemplate());
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









//Specialized directives
.directive('tracks', function() {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/tracks.html',
    controller: 'tracksCtrl'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/item-type.html'
  }
})





// Generic field directives
.directive('fieldCheckbox', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-checkbox.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredText', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-required-text.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredDate', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-required-date.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldNoEdit', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-no-edit.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredRuntime', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-required-runtime.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        //This directive's compile call is in a nested directive validateRuntime
    }
  }
})
.directive('fieldOptionalText', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-optional-text.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldOptionalTextarea', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-optional-textarea.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredNumber', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'edit-item/directives/field-required-number.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})







// Validation directives

.directive("validateRuntime", function($compile){
          return {
           restrict: 'A',
           require: 'ngModel',
           link: function(scope, ele, attrs, ctrl){
            
            //This replaces the compile call in the fieldRuntime directive
            $compile(ele.contents())(scope);


              ctrl.$parsers.unshift(function(value) {
                if(value){

                  var valid = false;
                	var values = value.split(":");
                	if(values.length==3){
                		valid=true;
                		for(var i=0; i<values.length; i++){
                			if(!(values[i].length==2 && !isNaN(parseInt(values[i])))) {
                				valid=false;
                			}
                		}
                	}
                  console.log(valid);
                  ctrl.$setValidity('invalidRuntime', valid);
                }
              
                return valid ? value : undefined;
              });

           }
          }
        })

;








