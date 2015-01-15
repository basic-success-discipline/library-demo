'use strict';

angular.module('myApp.services', [])
.service('getData', function ($http) {
        return {
            getAll: function () {
                return $http.get("/app/json/testData.json");
            }
        }
    })
.service('sharedProperties', function ($http) {
		var id = "1";
        return {
            getID: function () {
                return id;
            },
            setID: function(newID){
            	id = newID;
            }
        }
    });