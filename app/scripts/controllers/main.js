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

    // config slider
	  $scope.sliderConfig = {
      ceil: 5,
      floor: 1,
      hideLimitLabels: true,
      stepsArray: ['Not comfortable', 'Hardly comfortable', 'Somewhat comfortable', 'Comfortable', 'Very comfortable'],
      onChange: function () {
      	// update careers displayed if slider values change
    		console.log('on change');
        if(Quiz.careers) {
        	Quiz.updateCareers($scope.entries);
		    	$scope.careers = [];
		    	Quiz.careers.forEach(function(career) {
				    if (career.show) {
				    	$scope.careers.push(career);
				    }
					});
	    	}
      }
    };


    // load careers
		$scope.$watch(function () { return Quiz.receivedFlag; }, function () {
    	console.log('flag changed');
    		$scope.careers = Quiz.careers;
	  });

  	// update careers displayed if slider values change
    $scope.$watch('entries', function (careers) {
    	console.log('entries changed');
    	if(Quiz.careers) {
    		console.log('called');
	    	$scope.careers = [];
	    	Quiz.careers.forEach(function(career) {
			    // if show, add career
			    if (career.show) {
			    	$scope.careers.push(career);
			    }
				});
    	}
	  });

});