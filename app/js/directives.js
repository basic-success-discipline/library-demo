'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('active', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('author', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('discourseDate', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('itemId', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('runtime', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('s3URL', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('subtitle', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('summary', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('title', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
.directive('type', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}: {{value}}</span>'
  }
})
;