'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('byTypes', function () {
	return function (items, types) {
		var acceptableTypes = ['cd','dvd','ebook'];
		var filtered = [];
		for(var j=0; j<types.length; j++){
			if(acceptableTypes.indexOf(types[j])!=-1 ){
				for (var i = 0; i < items.length; i++) {
					var item = items[i];
					if (item.type==types[j]) {
						filtered.push(item);
					}
				}
			}
		}
		return filtered;
	};
})
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
});