'use strict';

angular.module('ccApp')
	.factory('Quiz', function($http) {
	  var service = {};

	  service.entries = [
	  	{
	  	  subject:'test', 
	  	  slider: {
	  	  	value: 1,
	        options: {
	            ceil: 5,
	            floor: 1,
	            showTicksValues: true,
	            ticksValuesTooltip: function(v) {
	            		switch(v) {
								    case 1:
								        return 'Not comfortable';
								    case 2:
								        return 'Not very comfortable';
								    case 3:
								        return 'Somewhat comfortable';
								    case 4:
								        return 'Comfortable';
								    case 5:
								        return 'Very comfortable';
										}
	            }
	        }
	  	  }
	  	}
	  ];

	  // get careers (http)

	  // save answers

	  // sort/update careers --> slider callback --> on change or on end; show ticks, show ticks values, ceil

	  /*
		$scope.slider_ticks_values_tooltip = {
	        value: 5,
	        options: {
	            ceil: 10,
	            floor: 0,
	            showTicksValues: true,
	            ticksValuesTooltip: function(v) {
	                return 'Tooltip for ' + v; // cange to very comfortable, not comfortable, somewhat comfortable, etc - if elses? case switch?
	            }
	        }
	    };
	  */

	  return service;
	});