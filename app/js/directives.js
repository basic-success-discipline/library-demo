'use strict';

/* Directives */


angular.module('myApp.directives', [])




//Specialized directives
.directive('tracks', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/tracks.html',
    controller: 'tracksCtrl'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-type.html'
  }
})





// Generic field directives
.directive('fieldCheckbox', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-checkbox.html'
  }
})
.directive('fieldRequiredText', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-text.html'
  }
})
.directive('fieldDate', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-date.html'
  }
})
.directive('fieldNoEdit', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-no-edit.html'
  }
})
.directive('fieldRuntime', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-runtime.html'
  }
})
.directive('fieldOptionalText', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-optional-text.html'
  }
})
.directive('fieldOptionalTextarea', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-optional-textarea.html'
  }
})
.directive('fieldRequiredNumber', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-number.html'
  }
})







// Validation directives

.directive("validateRuntime", function(){
          return {
           restrict: 'A',
           require: 'ngModel',
           link: function(scope, ele, attrs, ctrl){
              ctrl.$parsers.unshift(function(value) {
                if(value){
                  var valid = false;
                	var values = value.split(":");
                	if(values.length==3){
                		valid=true;
                		for(var i=0; i<values.length; i++){
                			if(!(values[i].length==2 && !isNaN(parseInt(values[i])))) {
                				valid=false;
                			}
                		}
                	}
                  ctrl.$setValidity('invalidRuntime', valid);
                }
                return valid ? value : undefined;
              });
           }
          }
        })




;
