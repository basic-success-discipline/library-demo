'use strict';

//this module manages drag and drop, addition, and deletion of categories and publications in the publication structure
//see AL-sortable.js for drag and drop functionality

angular.module('myApp.pubStruct', ['monospaced.elastic', 'al.sortable'])
.controller('pubStructCtrl', ['$scope', 'dataModel', function($scope, dataModel){

	dataModel.setDemoViewed("Publication Structure");
	$scope.demoViews = dataModel.getDemoViews();

	var getItems= function(){
		var promise = dataModel.getItems();
		promise.then(
			function(payload){
				$scope.items=payload;
				getStruct();
			},
			function(errorPayload){
				$log.error('failure loading data', errorPayload);
			});
	}
	var getStruct = function(){
		var promise = dataModel.getPubStruct();
		promise.then(
			function(payload) { 
				$scope.originalStructure = payload.data;
				$scope.category=angular.copy($scope.originalStructure);
				$scope.category["subcategories"]=$scope.category["Categories"];
				$scope.category["title"]="Publications";
				$scope.category["publications"]=[];
				$scope.subcat=$scope.category;
				$scope.parentcat=null;
			},
			function(errorPayload) {
				$log.error('failure loading publication structure', errorPayload);
			});
	}
	getItems();

	$scope.undo = function(){
		$scope.category=angular.copy($scope.originalStructure);
		$scope.category["subcategories"]=$scope.category["Categories"];
		$scope.category["title"]="Publications";
		$scope.category["publications"]=[];
		$scope.subcat=$scope.category;
	}

	$scope.save = function(){
		alert("Publication structure saved! But not really because I do not have a real backend");
		// var promise = dataModel.updatePubStruct($scope.category);
		// promise.then(
		// 	function(payload){
		// 		getStruct();
		// 	},
		// 	function(errorPayload) {
		// 		$log.error('failure saving publication structure', errorPayload);
		// 	});
	}

	$scope.addCategory = function(category){
		category.subcategories.push({title:"New Category", subcategories: [], publications: []});
	}

	$scope.addPublication = function(category, pubID){
		// console.log("added publication: " + pubID + " to " + category);
		category.publications.push(pubID);
	}
	$scope.deleteCategory = function(category, parentCategory){
		for (var i =0; i <parentCategory.subcategories.length; i++){
			if(parentCategory.subcategories[i].title == category.title){
				parentCategory.subcategories.splice(i,1);
			}
		}
	}

	$scope.deletePublication = function(category, publication){
		for (var i =0; i <category.publications.length; i++){
			if(parseInt(category.publications[i]) == parseInt(publication.id)){

				category.publications.splice(i,1);
			}
		}
	}

}])
.filter('pubStructFilter', function(){

	return _.memoize(function (ids, items){
		var filtered = [];

		angular.forEach(ids, function(id){

			for(var i=0; i<items.length; i++){
				var item = items[i];
				if(item["id"] == id){
					filtered.push({id:id, title: item["title"]});
				}
			}
		});
		return filtered;
	}
	);

})


// this allows for categories within categories

.directive('recursiveStructure', function(recursionHelper, dataModel) {
	return {
		restrict: 'E',
		required: 'category',
		scope:{
			category: "=",
			parentCategory: "=",
			items: "=",
			addCategory: "&",
			addPublication: "&",
			deleteCategory: "&",
			deletePublication: "&",
			isTop: "="
		},

		templateUrl: 'pub-struct/recursive-structure.html',
		compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return recursionHelper.compile(element, function(scope){
            	scope.titleEditable=false;
            	scope.addingNewPub=false;

            	scope.toggleEditable = function(bool){

            		scope.titleEditable=bool;
            		if(scope.isTop){
            			scope.titleEditable = false;
            		}
            	}
            	scope.addCategoryRecursive = function(cat){
            		scope.addCategory({subcat: cat});
            	}
            	scope.showNewPubSelect = function(bool){
            		scope.addingNewPub=bool;
            	}
            	scope.addPublicationRecursive = function(cat, pub){
            		scope.addPublication({subcat: cat, pub: pub});
            		scope.showNewPubSelect(false);
            		scope.search="";
            	}
            	scope.deleteCategoryRecursive = function(cat, parentCat){
            		scope.deleteCategory({subcat: cat, parentcat: parentCat});
            	}
            	scope.deletePublicationRecursive = function(cat, pub){
            		scope.deletePublication({subcat: cat, pub: pub});
            	}
            });
}

}
})







;