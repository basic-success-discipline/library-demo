'use strict';

angular.module('myApp.services', [])
.service('getData', function ($http) {
        return {
            getData: function () {
                return $http.get("/app/json/testData.json");
            }
        }
    });