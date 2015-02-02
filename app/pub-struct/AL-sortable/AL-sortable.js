angular.module('al.sortable', [])
.controller('dragDropCtrl', ['$scope', function($scope){

	$scope.dragPub=null;
	$scope.dragCat=null;
	$scope.dragParent=null;
	$scope.dragType=null;
	$scope.dropCat=null;
	$scope.dropIndex=null;

}])

.directive('draggable', function(dragDrop) {
	return {
		scope: {
			pub: "=",
			category: "=",
			parentCategory: "=",
			draggableType: "@"
		},
		controller: "dragDropCtrl",
		link: function(scope, element, attrs, dragDropCtrl) {
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
						if(dragDrop.wasValidDrop()){
							scope.$apply(function(){
								for (var i=0; i<scope.parentCategory.subcategories.length; i++){
									if(scope.parentCategory.subcategories[i].title == scope.category.title){
										scope.parentCategory.subcategories.splice(i,1);
									}
								}
							});
						}
					}
				}
				return false;
			});
		},
		contoller: "dragDropCtrl"
	}
})
.service('dragDrop', function(){
	var vd = true;
	var rd = false;
	return {
		isValidDrop : function(drag, drop){
			var dragDrop = true;
			if(drag.title == drop.title){
				dragDrop = false;
			}else{
				for(var i=0; i<drag.subcategories.length; i++){

					if(dragDrop){
						dragDrop = this.isValidDrop(drop, drag.subcategories[i]);
					}
				}
			}
			vd = dragDrop;
			return dragDrop;
		},
		wasValidDrop: function(){
			if(rd){
				rd=false;	
				return vd;
			}else{
				return false;
			}
			
		},
		receivedDrop: function(bool){
			rd= true;
		}
	}
})


.directive('droppable', function(dragDrop) {
	return {
		scope: {
			category: '=',
		},
		controller: "dragDropCtrl",
		link: function(scope, element, attrs, dragDropCtrl) {

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
			        dragDrop.receivedDrop();
			        var item =JSON.parse(e.dataTransfer.getData('Text'));
			        if(item.hasOwnProperty('id')){
			        	// console.log("publication: " + item.id+ " dropped in category: " + scope.category.title);

			        	scope.$apply(function(){
			        		

			        		//add the new item at the right place, saving that index
			        		if(!scope.category.dropIndex){
			        			scope.category.dropIndex = scope.category.publications.length;
			        			scope.category.publications.push(item.id);
			        		}else if(scope.category.dropIndex >scope.category.publications.length){
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
			        		if(dragDrop.isValidDrop(item, scope.category)){
			        			// console.log("was valid drop");


					        	//add the new item at the right place, saving that index
					        	if(!scope.category.dropIndex){
					        		// console.log('no drop index');
					        		scope.category.dropIndex = scope.category.subcategories.length;
					        		scope.category.subcategories.push(item);
					        	}else if(scope.category.dropIndex >scope.category.subcategories.length){
					        		scope.category.dropIndex = scope.category.subcategories.length;
					        		scope.category.subcategories.push(item);
					        	}else{
					        		// console.log('drop index: ' + scope.category.dropIndex);
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
				        		
				        	}
				        });

}	
return false;
},
false
);


},
		contoller: "dragDropCtrl"
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
					this.classList.remove('sorta-over');
					return false;
				},
				false
				);

		},
		contoller: "dragDropCtrl"
	}
})