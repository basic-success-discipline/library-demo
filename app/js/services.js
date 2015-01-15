'use strict';

angular.module('myApp.services', [])
.service('getData', function ($http) {
        return {
            getAll: function () {
                return $http.get("/app/json/testData.json");
            }
        }
    });