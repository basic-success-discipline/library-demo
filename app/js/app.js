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
  $routeProvider.when('/home', {templateUrl: 'views/home.html', controller: 'homeCtrl'});
  $routeProvider.when('/cds', {templateUrl: 'views/cds.html', controller: 'cdsCtrl'});
  $routeProvider.when('/dvds', {templateUrl: 'views/dvds.html', controller: 'dvdsCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
  
}]);
