'use strict';

/* Directives */


angular.module('myApp.directives', [])
.directive('active', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}} <input type="checkbox" ng-checked="value == 1" ng-model="value" ng-disabled="!editMode" ng-change="addEdit(key,value)"></span>'
  }
})
.directive('author', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('discourseDate', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('itemId', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
  }
})
.directive('runtime', function() {
  return {
    restrict: 'A',
    template: '<span>{{key}}<textarea ng-readonly="!editMode" ng-bind="key" ng-model="value" ng-change="addEdit(key, value)"></textarea></span>'
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
    template: '<input type="radio" ng-model="value" value="cd" ng-disabled="!editMode">CD<br><input type="radio" ng-model="value" value="dvd" ng-disabled="!editMode">DVD<br><input type="radio" ng-model="value" value="ebook" ng-disabled="!editMode">eBook<br>'
  }
})
;