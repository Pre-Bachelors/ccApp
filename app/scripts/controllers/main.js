'use strict';

/**
 * @ngdoc function
 * @name appApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appApp
 */
angular.module('ccApp')
  .controller('MainCtrl', ['$scope', 'Quiz', function($scope, Quiz) {
    $scope.entries = Quiz.entries;
  }]);
