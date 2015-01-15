'use strict';

/* Directives */


angular.module('myApp.directives', [])
 .directive('editItemView', function(){
    return{
      restrict: 'A',
      templateUrl: 'views/directives/edit-item-view.html'
    }
  });