'use strict';

angular.module('myApp.services', [])
.service('getData', function ($http) {
        return {
            getAll: function () {
                return $http.get("/app/json/testData.json");
            }
        }
    })
.service('sharedProperties', function () {
		var item = {"No item selected.":""};
        return {
            getEditItem: function () {
                return item;
            },
            setEditItem: function(newEditItem){
            	item = newEditItem;
            }
        }
    });