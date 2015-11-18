'use strict';

angular.module('ccApp')
	.factory('Quiz', function($http) {
	  var service = {};

	  // helper functions
		var helpers= {
			// taken from http://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
			decodeHtml: function(html) {
		    var txt = document.createElement("textarea");
		    txt.innerHTML = html;
		    return txt.value;
		  }
		};

	  // set up questions
	  service.entries = [
	  	{
	  	  subject:'Maths',
	  	  value: 0,
	  	  equiv: 'requiresQuantitativeSkills'	  	
	  	},
	  	{
	  	  subject:'Writing and Speaking',
	  	  value: 0,
	  	  equiv: 'requiresVerbalAndSocialSkills'	  		  	
	  	},
	  	{
	  	  subject:'Competitive',
	  	  value: 0,
	  	  equiv: 'easeOfCompetition'	  		  	
	  	},
	  	{
	  	  subject:'Uncertain',
	  	  value: 0,
	  	  equiv: 'optionValue'	  		  	
	  	}
	  ];

	     
	  // get careers
	  // done locally due to cross-domain ajax requests constraints
		$http.get('scripts/json/career_profiles.json')
		.then(function(response) {
			service.careers = response.data;
			service.careers.forEach(function(entry) {
				entry.title = helpers.decodeHtml(entry.title);
			});
			service.receivedFlag = true;
		}, function() {
			alert('error!');
		});


	  // update careers 
	  service.updateCareers = function(entries) {
	  	// for every answer
	  	entries.forEach(function(answer) {
	  		if (service.careers) {
		  		// for every career		  		
		  		service.careers.forEach(function(career) {
				  // filter out every career that is bigger than answer val
					  var career_level = parseInt(career.custom_fields[answer.equiv]);
					  var threshold = answer.value + 1;
			  		career.show = ( career_level < threshold );
			  	});
		  	} else {
		  		console.log('no careers');
		  	}
	  	});
	  };


// sort careers



// --> slider callback --> on change or on end; show ticks, show ticks values, ceil
// every time it changes, redo service.careers = service.all_careers;

	  return service;
	});
