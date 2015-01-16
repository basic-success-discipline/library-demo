'use strict';

angular.module('myApp.controllers', [])
.controller('itemListCtrl', ['$scope', '$location', '$filter', 'getData', 'sharedProperties', function($scope, $location, $filter, getData, sharedProperties) {


	$scope.getDataByType = function(selectedTypes){
		var promise = getData.getAll();
		promise.then(
			function(payload) { 
				$scope.allItems=payload.data;
				$scope.items = $filter('byTypes')($scope.allItems, selectedTypes);
			},
			function(errorPayload) {
				$log.error('failure loading test data', errorPayload);
			});
	}

	$scope.getDataByType(['cd','dvd','ebook']);
	$scope.showEditItemView = function(item){
		sharedProperties.setEditItem(item);
		$location.path('/edit-item');
	}

	$scope.chkbxs = [{label:"CDs", arg:"cd", val:true },
					 {label:"DVDs", arg:"dvd", val:true },
					 {label:"EBooks", arg:"ebook", val:true }];

	$scope.$watch( "chkbxs" , function(n,o){
		var trues=[];
		for(var i=0; i<$scope.chkbxs.length; i++){
			if ($scope.chkbxs[i].val){
				trues.push($scope.chkbxs[i].arg);
			}
		}
		if($scope.allItems){
			$scope.items = $filter('byTypes')($scope.allItems, trues);}
		}, true );

	
}])
.controller('editItemCtrl', ['$scope', '$filter', 'sharedProperties', function($scope, $filter, sharedProperties){
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
}]);