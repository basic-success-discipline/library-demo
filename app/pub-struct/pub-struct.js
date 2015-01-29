'use strict';

angular.module('myApp.pubStruct', ['ui.sortable'])
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

.directive('recursiveStructure', function(recursionHelper) {
	return {
		restrict: 'E',
		required: 'category',
		scope:{
			category: "=",
			items: "="
		},

		templateUrl: 'pub-struct/recursive-structure.html',
		compile: function(element) {
            // Use the compile function from the RecursionHelper,
            // And return the linking function(s) which it returns
            return recursionHelper.compile(element);
        }
    }
})


.directive('draggable', function() {
	return {
		scope: {
			pub: "=",
			category: "=",
			parentCategory: "=",
			draggableType: "@"
		},
		link: function(scope, element) {
			var el = element[0];
			el.draggable = true;
			el.addEventListener('dragstart', 
				function(e){
					e.stopPropagation();
				e.dataTransfer.effectAllowed = 'move'; //could make it copyMove later
				if(scope.draggableType=="pub"){
					e.dataTransfer.setData('Text', JSON.stringify(scope.pub));

				}
				else if(scope.draggableType=="category"){
					e.dataTransfer.setData('Text', JSON.stringify(scope.category));
					scope.category.gotDropped=false;

				}
				
				scope.parentCategory.gotDropped=false;
				this.classList.add('drag');
				return false;
			});

			el.addEventListener('dragend', function(e){
				this.classList.remove('drag');
				e.stopPropagation();

				var categoryGotDropped = scope.category ? scope.category.gotDropped : false;
				if(!scope.parentCategory.gotDropped && !categoryGotDropped){
					if(scope.draggableType=="pub"){

						scope.$apply(function(){
							for (var i=0; i<scope.parentCategory.publications.length; i++){
								if(scope.parentCategory.publications[i] == scope.pub.id){
									scope.parentCategory.publications.splice(i,1);
								}
							}
						});
					}
					else if(scope.draggableType=="category"){
						scope.$apply(function(){
							for (var i=0; i<scope.parentCategory.subcategories.length; i++){
								if(scope.parentCategory.subcategories[i].title == scope.category.title){
									scope.parentCategory.subcategories.splice(i,1);
								}
							}
						});
					}
				}
				return false;
			});
		}
	}
})


.directive('droppable', function() {
	return {
		scope: {
			category: '=',
		},
		link: function(scope, element) {

			var el = element[0];
			el.addEventListener(
				'dragover',
				function(e) {
					e.stopPropagation();
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
					e.stopPropagation();
					this.classList.add('over');
					return false;
				},
				false
				);

			el.addEventListener(
				'dragleave',
				function(e) {
					e.stopPropagation();
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

			        scope.category.gotDropped=true;
			        var item =JSON.parse(e.dataTransfer.getData('Text'));
			        if(item.hasOwnProperty('id')){
			        	// console.log("publication: " + item.id+ " dropped in category: " + scope.category.title);

			        	scope.$apply(function(){
			        		

			        		//add the new item at the right place, saving that index
			        		if(!scope.category.dropIndex){
			        			scope.category.dropIndex = scope.category.publications.length;
			        			scope.category.publications.push(item.id);
			        		}else{
			        			scope.category.publications.splice(scope.category.dropIndex, 0, item.id);
			        		}


			        		//find any duplicates (there should only be one)
			        		var dupIndex = null
			        		for(var i=0; i<scope.category.publications.length; i++){
			        			if(scope.category.publications[i] == item.id && i!=scope.category.dropIndex){
			        				dupIndex=i;
			        			}
			        		}

			        		//delete duplicate if any
			        		if(dupIndex!=null){
			        			scope.category.publications.splice(dupIndex,1);
			        		}
			        		delete scope.category.dropIndex;


			        	});
			        	

			        }else if(item.hasOwnProperty('subcategories')){
			        	// console.log("category: " + item.title+ " dropped in category: " +scope.category.title);
			        	

			        	scope.$apply(function(){



			        	//add the new item at the right place, saving that index
			        	if(!scope.category.dropIndex){
			        		console.log('no drop index');
			        		scope.category.dropIndex = scope.category.subcategories.length;
			        		scope.category.subcategories.push(item);
			        	}else{
			        		console.log('drop index: ' + scope.category.dropIndex);
			        		scope.category.subcategories.splice(scope.category.dropIndex, 0, item);
			        	}


			        		//find any duplicates (there should only be one)
			        		var dupIndex = null
			        		for(var i=0; i<scope.category.subcategories.length; i++){
			        			if(scope.category.subcategories[i].title == item.title && i!=scope.category.dropIndex){
			        				dupIndex=i;
			        			}
			        		}

			        		//delete duplicate if any
			        		if(dupIndex!=null){
			        			scope.category.subcategories.splice(dupIndex,1);
			        		}
			        		delete scope.category.dropIndex;

			        	});

			        	// var noDuplicate = true;
			        	// for(var i=0; i<scope.category.subcategories.length; i++){
			        	// 	if(scope.category.subcategories[i].title == item.title){
			        	// 		noDuplicate = false;
			        	// 	}
			        	// }

			        	// if(noDuplicate && item.title!=scope.category.title){
			        	// 	scope.$apply(function(){
			        	// 		scope.category.subcategories.push(item);	
			        	// 	});
			        	// }
			        	

			        }
			        

			        return false;
			    },
			    false
			    );
}
}
})

.directive('sortaDroppable', function() {
	return {
		scope: {
			parentCategory: "=",
			index: "@"
		},
		link: function(scope, element) {

			var el = element[0];
			el.addEventListener(
				'dragenter',
				function(e) {
					this.classList.add('sorta-over');
					return false;
				},
				false
				);

			el.addEventListener(
				'dragleave',
				function(e) {
					this.classList.remove('sorta-over');
					return false;
				},
				false
				);
			el.addEventListener(
				'drop',
				function(e) {
					scope.parentCategory.dropIndex = scope.index;
					console.log(scope.parentCategory.dropIndex);
					this.classList.remove('sorta-over');
					return false;
				},
				false
				);

		}
	}
})





;