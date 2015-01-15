'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('byType', function () {
  return function (items, type) {
    var filtered = [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      if (item.type==type) {
        filtered.push(item);
      }
    }
    return filtered;
  };
});