'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('itemListFilter', function(){
	return function (items, filterOptions){
		var filtered = [];
			
		angular.forEach(items, function(item){
			//type

			if(filterOptions.types[item.type]){
				
				//active
				if(filterOptions.activeOnly){
					if(item.active==1){
						filtered.push(item);
					}
				}else{
					filtered.push(item);
				}
			}
		});
		return filtered;
	}
});