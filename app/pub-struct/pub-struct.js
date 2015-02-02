'use strict';

angular.module('myApp.pubStruct', ['monospaced.elastic', 'al.sortable'])
.controller('pubStructCtrl', ['$scope', 'getData', function($scope, getData){
	var getItems= function(){
		var promise = getData.getAll();
		promise.then(
			function(payload){
				$scope.items=payload.data;
				getStruct();
			},
			function(errorPayload){
				$log.error('failure loading data', errorPayload);
			});
	}
	var getStruct = function(){
		var promise = getData.getPubStruct();
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
		console.log($scope.category);
	}

	$scope.addCategory = function(category){
		category.subcategories.push({title:"New Category", subcategories: [], publications: []});
	}

	$scope.addPublication = function(category, pubID){
		console.log("added publication: " + pubID + " to " + category);
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

.directive('recursiveStructure', function(recursionHelper, getData) {
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