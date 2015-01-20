'use strict';

/* Directives */


angular.module('myApp.directives', [])



// Item-level directives
.directive('active', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/active.html'
  }
})
.directive('author', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/author.html'
  }
})
.directive('discourseDate', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/discourseDate.html'
  }
})
.directive('itemId', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/itemId.html'
  }
})
.directive('runtime', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/runtime.html'
  }
})
.directive('awsFolderName', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/s3URL.html'
  }
})
.directive('subtitle', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/subtitle.html'
  }
})
.directive('summary', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/summary.html'
  }
})
.directive('title', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/title.html'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/itemType.html'
  }
})






// Track-level directives

.directive('filename', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('trackId', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('trackName', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('trackNumber', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('trackTime', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})




// Validation directives

.directive("validateRuntime", function(){
          // requires an isloated model
          return {
           // restrict to an attribute type.
           restrict: 'A',
          // element must have ng-model attribute.
           require: 'ngModel',
           link: function(scope, ele, attrs, ctrl){

              // add a parser that will process each time the value is
              // parsed into the model when the user updates it.
              ctrl.$parsers.unshift(function(value) {
                if(value){

                  var valid = false;
                	var values = value.split(":");
                	if(values.length==3){

                		valid=true;
                		for(var i=0; i<values.length; i++){
                			if(!(values[i].length==2 && angular.isNumber(parseInt(values[i])))) {
                				valid=false;
                			}
                		}
                	}
                  ctrl.$setValidity('invalidRuntime', valid);
                }

                // if it's valid, return the value to the model,
                // otherwise return undefined.
                return valid ? value : undefined;
              });

           }
          }
        })




;
