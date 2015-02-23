'use strict';
//This module controls the "/edit-item" view which acts as:
// a read-only details view of a given item (createMode=false, editMode = false),
// a saveable edit view for an item (createMode= false, editMode = true), 
// or an empty form view for creating new items (createMode = true, editMode = true).


angular.module('myApp.editItem', [])
.controller('editItemCtrl', ['$scope', '$location',  'dataModel', function($scope, $location, dataModel){
	var item = dataModel.getEditItem();
	$scope.item = {"obj": item, "copy":""};
	$scope.createMode = false;
	$scope.editMode = false;
	$scope.itemType = "cd";

  //if creating a new item
	if ($scope.item.obj == null){
		$scope.createMode = true;
		$scope.editMode = true;
		var template = dataModel.getTemplate();
		$scope.item.obj = template[$scope.itemType].newEntry;
    dataModel.setDemoViewed("New Item View");
  $scope.demoViews = dataModel.getDemoViews();

	} else{
    dataModel.setDemoViewed("Edit Item View");
  $scope.demoViews = dataModel.getDemoViews();
  }

	$scope.itemType = $scope.item.obj["type"];
	$scope.edits ={"obj":{}}; //this kind of variable format is used so that scope variables can be shared with child controllers (tracksCtrl)



//should update which form fields are visible based a change in item type
	$scope.updateFields = function(type){
		if($scope.createMode){
			$scope.itemType=type;
			var template = angular.copy(dataModel.getTemplate());
			$scope.item.obj = template[$scope.itemType].newEntry;
			$scope.refreshEditItemView();
      for(var key in $scope.edits.obj){
        if($scope.item.copy[key]!=null && key!='tracks'){
          $scope.item.copy[key] = $scope.edits.obj[key];
        }else{
          delete $scope.edits.obj[key];
        }
      }
		}
	};


	$scope.saveNew = function(){
    var active = $scope.item.copy.active;
    if(active){
      $scope.item.copy.active = "1";
    }else{
      $scope.item.copy.active = "0";
    }
    alert("Item saved! But not really because I have no real backend");
    // var promise = dataModel.addNewItem($scope.item.copy);

    // promise.then(function(item){
    //   $scope.createMode =false;
    //   $scope.editMode = false;
    //   dataModel.setEditItem(item);
    //   $scope.item = {"obj": item, "copy":""};
    //   $scope.refreshEditItemView();
    //   $scope.edits.obj ={};
    // });


  }

	
	$scope.refreshEditItemView = function(){
		$scope.item.copy =  angular.copy($scope.item.obj);
	}

	
	$scope.toggleEditMode = function(bool){
		$scope.editMode = bool;
		if(!bool){
			$scope.refreshEditItemView();
			$scope.edits.obj={};
		}
	}

	$scope.addEdit = function(key){
    		if($scope.item.copy[key]){

			$scope.edits.obj[key] = $scope.item.copy[key];
		}
	}

	$scope.saveEdit = function(){ 
    if ($scope.edits.obj.active){
      var active = $scope.edits.obj.active;
      if(active){
        $scope.edits.obj.active = "1";
      }else{
        $scope.edits.obj.active = "0";
      } 
    }

    alert("Item saved! But not really because I have no real backend");
    // var promise = dataModel.updateItem($scope.item.copy, $scope.edits.obj);
    // promise.then(function(item){
    //   dataModel.setEditItem(item);
    //   $scope.item = {"obj": item, "copy":""};
    //   $scope.editMode = false;
    //   $scope.refreshEditItemView();
    //   $scope.edits.obj={};
    // })
    // var promise = dataModel.getItem($scope.item.copy.id);
    // promise.then(function(item){
    //   dataModel.setEditItem(item.data);
    //   $scope.item = {"obj": item.data, "copy":""};
    //   $scope.editMode = false;
    //   $scope.refreshEditItemView();
    //   $scope.edits.obj={};
    // });
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
    alert("Item deleted! But not really because I have no real backend");
     $location.path("/item-list");
  //  var promise = dataModel.deleteItem($scope.item.copy);
  //  promise.then(function(data){
  //   $location.path("/item-list");
  // });
   
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


//should return the correct order for fields in the form
$scope.editItemFieldOrder = function(key){
  var fieldArray = dataModel.getEditItemOrder($scope.itemType);
  for(var i=0; i<fieldArray.length; i++){
    if (fieldArray[i]==key){
      return i;
    }
  }

}

$scope.keys = function(obj){
  return obj? Object.keys(obj) : [];
}


//this is needed since tracks has a key named "filename" as well
$scope.ensureUnique = function(key){
  if(key=="filename"){
    return "itemFilename";
  }
  else return key;
}




$scope.refreshEditItemView();
  
}])



//this controls the logic in the tracks directive
.controller('tracksCtrl', ['$scope', 'dataModel', function($scope, dataModel){
	


	$scope.addNewTrack = function(){
		var template = angular.copy(dataModel.getTemplate());
		var newTrack = template[$scope.itemType].newTrack;
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

//this is needed since there is an item-level key named "filename" as well
  $scope.ensureUnique = function(key){
  if(key=="filename"){
    return "trackFilename";
  }
  else return key;
}

  $scope.dropIndex=null;



}])


.controller('trackCtrl', ['$scope', function($scope){
	$scope.bindItem= $scope.track;

}])







//Specialized directives
.directive('tracks', function() {
  return {
    restrict: 'AC',
    templateUrl: 'edit-item/directives/tracks.html',
    controller: 'tracksCtrl'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'AC',
    templateUrl: 'edit-item/directives/item-type.html'
  }
})





// Generic field directives
.directive('fieldCheckbox', function($compile) {
  return {
    restrict: 'AC',
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
    restrict: 'AC',
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

.directive('saveCursor', function(){
  return{
    require: "ngModel",
    link: function (scope, element, attrs, ctrl) {
      var el = element[0];
      ctrl.$parsers.push(function(value) {
        if(value){
          var start = el.selectionStart;
          var end = el.selectionEnd;
          window.setTimeout(function() {
            el.setSelectionRange(start, end);
          }, 0);
          return value;
        }
      });
    }
  }
})
.directive('fieldRequiredDate', function($compile) {
  return {
    restrict: 'AC',
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
    restrict: 'AC',
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
    restrict: 'AC',
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
    restrict: 'AC',
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
    restrict: 'AC',
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
    restrict: 'AC',
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
   restrict: 'AC',
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
              ctrl.$setValidity('invalidRuntime', valid);
            }

            return valid ? value : undefined;
          });

          }
        }
      })







//the remaining code is for managing drag and drop reordering of tracks

.directive('draggableTrack', function(dragDropTrack) {
  return {
    link: function(scope, element, attrs) {
        // this gives us the native JS object
        var el = element[0];

        el.draggable = true;

        el.addEventListener(
          'dragstart',
          function(e) {
            e.dataTransfer.effectAllowed = 'move';
                // var dragItem = {track: attrs.track, index: attrs.index};
                // e.dataTransfer.setData('Text', dragItem);
                dragDropTrack.setDragItem(JSON.parse(attrs.track), attrs.index);
                this.classList.add('drag');
                dragDropTrack.setDropIndex(scope.item.copy['tracks'].length);
                e.dataTransfer.setData('Text', JSON.stringify(JSON.parse(attrs.track)));
                return false;
              },
              false
              );

        el.addEventListener(
          'dragend',
          function(e) {
            this.classList.remove('drag');
            return false;
          },
          false
          );
      }
    }
  })



.directive('droppableTrack', function(dragDropTrack) {
  return {
    link: function(scope, element) {
            // again we need the native object
            var el = element[0];
            el.addEventListener(
              'dragover',
              function(e) {
                e.dataTransfer.dropEffect = 'move';
                    // allows us to drop
                    if (e.preventDefault) e.preventDefault();
                    this.classList.add('over');
                    return false;
                  },
                  false
                  );

            el.addEventListener(
              'dragenter',
              function(e) {
                return false;
                this.classList.add('over');
              },
              false
              );

            el.addEventListener(
              'dragleave',
              function(e) {
                this.classList.remove('over');
                return false;
              },
              false
              );

            el.addEventListener(
              'drop',
              function(e) {
                    // Stops some browsers from redirecting.
                    if (e.stopPropagation) e.stopPropagation();

                    this.classList.remove('over');
                    var dropItem = dragDropTrack.getDragItem();
                    var track = dropItem.track;
                    var oldIndex = dropItem.index;
                    var newIndex = dragDropTrack.getDropIndex();

                    scope.item.copy['tracks'].splice(newIndex, 0, track);

                    if(newIndex<=oldIndex){
                      oldIndex++;
                    }
                    scope.item.copy['tracks'].splice(oldIndex, 1);
                    scope.addEdit('tracks');
                    dragDropTrack.setDropIndex(scope.item.copy['tracks'].length);
                    scope.$apply();
                    return false;
                  },
                  false
                  );
          }
        }
      })


//This directive allows for highlighting betweeen tracks so that you can see where you're dropping your draggable track

.directive('sortaDroppableTrack', function(dragDropTrack) {
  return {

    link: function(scope, element, attrs) {
            // again we need the native object
            var el = element[0];
            el.addEventListener(
              'dragover',
              function(e) {
                  // e.stopPropagation();
                  if (e.preventDefault) e.preventDefault();
                  this.classList.add('sorta-over');
                  return false;
                },
                false
                );

            el.addEventListener(
              'dragenter',
              function(e) {
                  // e.stopPropagation();
                  this.classList.add('sorta-over');

                  return false;
                },
                false
                );

            el.addEventListener(
              'dragleave',
              function(e) {
                  // e.stopPropagation();
                  this.classList.remove('sorta-over');
                  return false;
                },
                false
                );

            el.addEventListener(
              'drop',
              function(e) {
                    // Stops some browsers from redirecting.
                    if (e.preventDefault) e.preventDefault();
                    this.classList.remove('sorta-over');
                    dragDropTrack.setDropIndex(attrs.index);
                    return false;
                  },
                  false
                  );
          }
        }
      })


.service('dragDropTrack', function(){
  var dropIndex, dragItem;

  return {
    getDropIndex: function(){
      return dropIndex;
    },
    setDropIndex: function(index){
      dropIndex = index;
    },
    setDragItem: function(track, index){
      dragItem = {track:track, index: index};
    },
    getDragItem: function(){
      return dragItem;
    }
  } 


})




;








