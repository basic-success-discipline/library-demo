//this module provides drag and drop functionality for the publication structure view


angular.module('al.sortable', [])
.controller('dragDropCtrl', ['$scope', function($scope){

	$scope.dragPub=null;
	$scope.dragCat=null;
	$scope.dragParent=null;
	$scope.dragType=null;
	$scope.dropCat=null;
	$scope.dropIndex=null;

}])


//This simulates a controller for all the drag and drop functionality
.service('dragDrop', function(){
	var drag = {pub:null,category:null,parent:null,type:null};
	var drop = {category: null};
	var sortaDrop = {index: null, category:null};
	var vd = true;
	return {
		setDragVars: function(pub, cat, parent, type){
			drag.pub = pub;
			drag.category = cat;
			drag.parent = parent;
			drag.type = type;
		},
		getDragItem : function(){
			if(drag.type=="pub"){
				return drag.pub;
			}
			else if(drag.type=="category"){
				return drag.category;
			}
		},
		setDropVars : function(cat){
			drop.category = cat;
		},
		setSortaDropVars : function(index, category){
			sortaDrop.index = index;
			sortaDrop.category = category; 
		},
		getDrag : function(){
			return drag;
		},
		getDrop : function(){
			return drop;
		},
		getSortaDrop : function(){
			return sortaDrop;
		},
		
		isValidDrop : function(rdrag, rdrop){
			var validDrop = true;
			if(rdrag.title == rdrop.title){
				validDrop = false;
			}else{
				for(var i=0; i<rdrag.subcategories.length; i++){

					if(validDrop){
						validDrop = this.isValidDrop(rdrag.subcategories[i], rdrop );
					}
				}
			}
			vd = validDrop;
			return validDrop;
		},
		wasValidDrop: function(){
			if(drop.category!=null){
				drop.category = null;	
				return vd;
			}else{
				return false;
			}
			
		},
		
	}
})



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
				dragDrop.setDragVars(scope.pub, scope.category, scope.parentCategory, scope.draggableType);
				var dragItem = dragDrop.getDragItem();
				e.dataTransfer.setData('Text', JSON.stringify(dragItem));

				
				// scope.parentCategory.gotDropped=false;
				this.classList.add('drag');
				return false;
			});

			el.addEventListener('dragend', function(e){
				this.classList.remove('drag');
				e.stopPropagation();

				// var categoryGotDropped = scope.category ? scope.category.gotDropped : false;
				var drag = dragDrop.getDrag();
				var drop = dragDrop.getDrop();
				if(drop.category!=null && drop.category.title!=drag.parent.title){
					if(drag.type=="pub"){

						scope.$apply(function(){
							for (var i=0; i<scope.parentCategory.publications.length; i++){
								if(scope.parentCategory.publications[i] == scope.pub.id){
									scope.parentCategory.publications.splice(i,1);
								}
							}
						});
					}
					else if(drag.type=="category" && drop.category.title!=drag.category.title){
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
			        if (e.preventDefault) e.preventDefault();
			        this.classList.remove('over');

			        // scope.category.gotDropped=true;
			        // dragDrop.receivedDrop();
			        dragDrop.setDropVars(scope.category);
			        var item =JSON.parse(e.dataTransfer.getData('Text'));
			        var dragType = dragDrop.getDrag().type;
			        if(dragType=="pub"){
			        	// console.log("publication: " + item.id+ " dropped in category: " + scope.category.title);

			        	scope.$apply(function(){
			        		
			        		var sorta = dragDrop.getSortaDrop();
			        		//add the new item at the right place, saving that index
			        		if(sorta.category!=null && sorta.category.title==scope.category.title && sorta.index<scope.category.publications.length){
			        			scope.category.publications.splice(sorta.index, 0, item.id);
			        		}
			        		else{
			        			sorta.index = scope.category.publications.length;
			        			scope.category.publications.push(item.id);
			        		}
			 
			        		//find any duplicates (there should only be one)
			        		var dupIndex = null
			        		for(var i=0; i<scope.category.publications.length; i++){
			        			if(scope.category.publications[i] == item.id && i!=sorta.index){
			        				dupIndex=i;
			        			}
			        		}

			        		//delete duplicate if any
			        		if(dupIndex!=null){
			        			scope.category.publications.splice(dupIndex,1);
			        		}
			        		dragDrop.setSortaDropVars(null, null);

			        	});
			        	

			        }else if(dragType=="category"){
			        	// console.log("category: " + item.title+ " dropped in category: " +scope.category.title);
			        	

			        	scope.$apply(function(){

			        		if(dragDrop.isValidDrop(item, scope.category)){
			        			

					        var sorta = dragDrop.getSortaDrop();
			        		//add the new item at the right place, saving that index
			        		if(sorta.category!=null && sorta.category.title==scope.category.title && sorta.index<scope.category.subcategories.length){
			        			scope.category.subcategories.splice(sorta.index, 0, item);
			        		}
			        		else{
			        			sorta.index = scope.category.subcategories.length;
					        	scope.category.subcategories.push(item);
			        		}


				        		//find any duplicates (there should only be one)
				        		var dupIndex = null
				        		for(var i=0; i<scope.category.subcategories.length; i++){
				        			if(scope.category.subcategories[i].title == item.title && i!=sorta.index){
				        				dupIndex=i;
				        			}
				        		}

				        		//delete duplicate if any
				        		if(dupIndex!=null){
				        			scope.category.subcategories.splice(dupIndex,1);
				        		}
				        		dragDrop.setSortaDropVars(null, null);
				        		
				        	}
				        });
					}	
					return false;
				},false
			);
		}
	}
})



//This directive allows for highlighting betweeen categories/publications so that you can see where you're dropping your draggable

.directive('sortaDroppable', function(dragDrop) {
	return {
		scope: {
			parentCategory: "=",
			index: "@"
		},
		link: function(scope, element) {

			var el = element[0];
			el.addEventListener(
			    'dragover',
			    function(e) {
			        // allows us to drop
			        if (e.preventDefault) e.preventDefault();
			        this.classList.add('sorta-over');
			        return false;
			    },
			    false
			);
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
					if (e.preventDefault) e.preventDefault();
					dragDrop.setSortaDropVars(scope.index, scope.parentCategory);
					this.classList.remove('sorta-over');
					return false;
				},
				false
				);

		},
		contoller: "dragDropCtrl"
	}
})