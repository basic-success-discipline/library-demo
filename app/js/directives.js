'use strict';

/* Directives */


angular.module('myApp.directives', [])



// Item-level directives
.directive('active', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}} <input type="checkbox" ng-checked="value == 1" ng-model="value" ng-disabled="!editMode" ng-change="addEdit(key,value)"></span>'
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
.directive('s3URL', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('subtitle', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('summary', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('title', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'A',
    template: '<input type="radio" ng-model="value" ng-bind="itemType" ng-change="updateFields(value)" value="cd" ng-disabled="!createMode">CD<br><input type="radio" ng-bind="itemType" ng-model="value" ng-change="updateFields(value)" value="dvd" ng-disabled="!createMode">DVD<br><input type="radio" ng-model="value"  ng-bind="itemType" value="ebook" ng-change="updateFields(value)" ng-disabled="!createMode">eBook<br>'
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
