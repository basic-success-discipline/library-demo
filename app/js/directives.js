'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('tracksView', function() {
  return {
    restrict: 'A',
    require: 'itemType', 
    scope: {
      tracks: '=',
      itemType: '=',
    },
    controller: 'tracksCtrl',
    templateUrl: 'views/tracks-view.html'
  }
});