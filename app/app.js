'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.itemList',
  'myApp.editItem',
  'myApp.pubStruct',
  'myApp.sharedAssets'
]);


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/item-list', {templateUrl: 'item-list/item-list.html', controller: 'itemListCtrl'});
  $routeProvider.when('/publication-structure', {templateUrl: 'pub-struct/pub-struct.html', controller: 'pubStructCtrl'});
  $routeProvider.otherwise({redirectTo: '/item-list'});

  $routeProvider.when('/edit-item',{
  	templateUrl: 'edit-item/edit-item.html', 
  	controller: 'editItemCtrl', 

    //should ensure that item templates are loaded in memory before loading this view
  	resolve: {
  		dataModelData: function(dataModel){
  			if(!dataModel.resolved){
				return dataModel.promise;
  			}
  		}
  	}
  });
  
}]);





