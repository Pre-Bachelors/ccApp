'use strict';

/**
 * @ngdoc function
 * @name ccApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ccApp
 */
angular.module('ccApp')
  .controller('MainCtrl', function($scope, Quiz) {
    $scope.entries = Quiz.entries;
    $scope.careers = Quiz.careers;
    $scope.btn = {
      hide: true,
      limit: 5
    };

    // config slider
	  $scope.entries.forEach(function(entry) {
      entry.sliderConfig = {
        ceil: 5,
        floor: 1,
        hideLimitLabels: true,
        stepsArray: entry.sliderLevels,
        onChange: function () {
        	// update careers displayed if slider values change
          if(Quiz.careers) {
          	Quiz.updateCareers($scope.entries);
  		    	$scope.careers = [];
  		    	Quiz.careers.forEach(function(career) {
  				    if (career.show) {
  				    	$scope.careers.push(career);
  				    }
  					});
            
  					// sort careers by career capital (decending order)
  					$scope.careers.sort(function(a, b) {
              if (a.custom_fields.careerCapital < b.custom_fields.careerCapital) {
                return 1;
              }
              if (a.custom_fields.careerCapital > b.custom_fields.careerCapital) {
                return -1;
              }
              if (a.custom_fields.careerCapital == b.custom_fields.careerCapital) {
                if ($scope.entries[0].value == 4) { // if max math 
                  if (a.custom_fields.requiresQuantitativeSkills > b.custom_fields.requiresQuantitativeSkills) {
                    return -1;
                  }
                  if (a.custom_fields.requiresQuantitativeSkills < b.custom_fields.requiresQuantitativeSkills) {
                    return 1;
                  }
                }
                if ($scope.entries[1].value == 4) {  // if max writing
                  if (a.custom_fields.requiresVerbalAndSocialSkills > b.custom_fields.requiresVerbalAndSocialSkills) {
                    return -1;
                  }
                  if (a.custom_fields.requiresVerbalAndSocialSkills < b.custom_fields.requiresVerbalAndSocialSkills) {
                    return 1;
                  }
                }
              }
              // a must be equal to b
              return 0;
            });
  	    	}
        }
      };
  });

    // watch changes to career & btn limit
    $scope.$watch('careers', function () {
      $scope.btn.hide = !($scope.btn.limit <= $scope.careers.length);
    });
    $scope.$watch('btn.limit', function () {
      $scope.btn.hide = !($scope.btn.limit <= $scope.careers.length);
    });
});