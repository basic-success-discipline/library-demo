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
;