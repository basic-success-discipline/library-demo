'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('byID', function () {
	return function (items, id) {

		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.id==id) {
				return item;
			}
		}
		return null;
	};
})
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