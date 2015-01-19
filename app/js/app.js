'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/item-list', {templateUrl: 'views/item-list.html', controller: 'itemListCtrl'});
  $routeProvider.when('/edit-item', {templateUrl: 'views/edit-item.html', controller: 'editItemCtrl'});
  $routeProvider.when('/create-item', {templateUrl: 'views/create-item.html', controller: 'createItemCtrl'});
  $routeProvider.otherwise({redirectTo: '/item-list'});
  
}]);
