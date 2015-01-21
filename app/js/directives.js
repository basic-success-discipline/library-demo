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
    templateUrl: 'views/directives/itemType.html'
  }
})






// Track-level directives

.directive('filename', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/filename.html'
  }
})
.directive('trackId', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/trackId.html'
  }
})
.directive('trackName', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/trackName.html'
  }
})
.directive('trackNumber', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/trackNumber.html'
  }
})
.directive('trackTime', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/trackTime.html'
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
