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
				$scope.category=payload.data;
				$scope.category["subcategories"]=$scope.category["Categories"];
				$scope.category["title"]="Publications";
				$scope.category["publications"]=[];
			},
			function(errorPayload) {
				$log.error('failure loading publication structure', errorPayload);
			});
	}
	getItems();





	

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

				if(!scope.parentCategory.gotDropped && !scope.category.gotDropped){
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

			        var item =JSON.parse(e.dataTransfer.getData('Text'));
			        if(item.hasOwnProperty('id')){
			        	console.log("publication: " + item.id+ " dropped in category: " + scope.category.title);
			        	var noDuplicate = true;
			        	for(var i=0; i<scope.category.publications.length; i++){
			        		if(scope.category.publications[i] == item.id){
			        			noDuplicate = false;
			        		}
			        	}
			        	if(noDuplicate){
			        		scope.$apply(function(){
			        			scope.category.publications.push(item.id);
			        		});
			        	}
			        	

			        }else if(item.hasOwnProperty('subcategories')){
			        	console.log("category: " + item.title+ " dropped in category: " +scope.category.title);
			        	
			        	var noDuplicate = true;
			        	for(var i=0; i<scope.category.subcategories.length; i++){
			        		if(scope.category.subcategories[i].title == item.title){
			        			noDuplicate = false;
			        		}
			        	}
			     
			        	if(item.title==scope.category.title){
			        		scope.category.gotDropped = true;

			        	}
			        	else if(noDuplicate){
			        		scope.$apply(function(){
			        			scope.category.subcategories.push(item);	
			        		});
			        	}
			        	scope.category.gotDropped=true;

			        }

			        
			        // this.appendChild(item);

			        return false;
			    },
			    false
			    );
}
}
})





;