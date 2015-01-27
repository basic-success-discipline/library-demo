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
.directive('fieldRequiredDate', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-date.html',
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
.directive('fieldRequiredRuntime', function($compile) {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/field-required-runtime.html',
    scope: {
      k: "=",
      v: "=",
      ic: "=",
      ae: "&",
      em: "="
    },
    link: function (scope, elm, attrs) {
        //This directive's compile call is in a nested directive validateRuntime
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

.directive("validateRuntime", function($compile){
          return {
           restrict: 'A',
           require: 'ngModel',
           link: function(scope, ele, attrs, ctrl){
            
            //This replaces the compile call in the fieldRuntime directive
            $compile(ele.contents())(scope);


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
                  console.log(valid);
                  ctrl.$setValidity('invalidRuntime', valid);
                }
              
                return valid ? value : undefined;
              });

           }
          }
        })




;
