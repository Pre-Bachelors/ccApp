'use strict';

angular.module('ccApp')
	.factory('Quiz', function($http) {
	  var service = {};

	  // set up questions
	  service.entries = [
	  	{
	  	  subject:'Maths',
	  	  value: 1	  	
	  	},
	  	{
	  	  subject:'Writing and Speaking',
	  	  value: 1	  		  	
	  	},
	  	{
	  	  subject:'Competitive',
	  	  value: 1	  		  	
	  	},
	  	{
	  	  subject:'Uncertain',
	  	  value: 1	  		  	
	  	}
	  ];

	  // config slider
	  service.sliderConfig = {
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
    };

	  // get careers (http)
	/*	$http.jsonp('https://80000hours.org/wp-json/career_profiles')
		.then(function(data) {
			service.careers = JSON.parse(data);
		}, function() {
			alert('error!');
		});
		$http.jsonp('https://80000hours.org/wp-json/career_profiles', {type:"GET", dataType: "jsonp"}).then(function(data) {
			service.careers = JSON.parse(data);
		}, function() {
			alert('error!');
		});
		$http({
		  method: 'GET',
		  url: 'https://80000hours.org/wp-json/career_profiles',
		}).then(function successCallback(response) {
		    // this callback will be called asynchronously
		    // when the response is available
		  }, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		}); */

		$http.get('scripts/json/career_profiles.json')
		.then(function(data) {
			service.careers = data;
		}, function() {
			alert('error!');
		});


	  // save answers

	  // sort/update careers --> slider callback --> on change or on end; show ticks, show ticks values, ceil

	  return service;
	});
