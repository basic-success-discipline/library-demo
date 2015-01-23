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
.directive('fieldCheckbox', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-checkbox.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredText', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-text.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldDate', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-date.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldNoEdit', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-no-edit.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRuntime', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-runtime.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldOptionalText', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-optional-text.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldOptionalTextarea', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-optional-textarea.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
  }
})
.directive('fieldRequiredNumber', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-number.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        $compile(elm.contents())(scope);
    }
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
