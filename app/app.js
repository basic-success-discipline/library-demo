'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.itemList',
  'myApp.editItem',
  'myApp.pubStruct',
  'myApp.sharedAssets'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/item-list', {templateUrl: 'item-list/item-list.html', controller: 'itemListCtrl'});
  $routeProvider.when('/edit-item', {templateUrl: 'edit-item/edit-item.html', controller: 'editItemCtrl'});
  $routeProvider.when('/publication-structure', {templateUrl: 'pub-struct/pub-struct.html', controller: 'pubStructCtrl'});
  $routeProvider.otherwise({redirectTo: '/item-list'});
  
}]);
