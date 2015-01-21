'use strict';

/* Directives */


angular.module('myApp.directives', [])



// Item-level directives
.directive('active', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/active.html'
  }
})
.directive('author', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/author.html'
  }
})
.directive('discourseDate', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/discourseDate.html'
  }
})
.directive('itemId', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/itemId.html'
  }
})
.directive('runtime', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/runtime.html'
  }
})
.directive('awsFolderName', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/s3URL.html'
  }
})
.directive('subtitle', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/subtitle.html'
  }
})
.directive('summary', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/summary.html'
  }
})
.directive('title', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/title.html'
  }
})
.directive('tracks', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/tracks.html',
    controller: 'tracksCtrl'
  }
})
.directive('itemType', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/item-fields/itemType.html'
  }
})






// Track-level directives

.directive('filename', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/track-fields/filename.html'
  }
})
.directive('trackId', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/track-fields/trackId.html'
  }
})
.directive('trackName', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/track-fields/trackName.html'
  }
})
.directive('trackNumber', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/track-fields/trackNumber.html'
  }
})
.directive('trackTime', function() {
  return {
    restrict: 'A',
    templateUrl: 'views/directives/track-fields/trackTime.html'
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
