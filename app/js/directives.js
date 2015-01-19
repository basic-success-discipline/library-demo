'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('myDir', function() {
  return {
    restrict: 'C',
    require: 'value',
    scope: {
    	key: '@',
    	value:'='

    },
    templateUrl: 'views/directives/active.html'
  }
});