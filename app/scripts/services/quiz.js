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
	  	  prompt: 'How strong are your math and science skills?',
	  	  value: 0,
	  	  sliderLevels: ['Unworkable', 'Okay', 'Good', 'Strong', 'Excellent'],
	  	  equiv: 'requiresQuantitativeSkills'	  	
	  	},
	  	{
	  	  subject:'Writing and Speaking',
	  	  prompt: 'How good are you at writing and speaking?',
	  	  value: 0,
	  	  sliderLevels: ['Unworkable', 'Okay', 'Good', 'Pretty good', 'Excellent'],
	  	  equiv: 'requiresVerbalAndSocialSkills'	  		  	
	  	},
	  	{
	  	  subject:'Competitive',
	  	  prompt: 'What level of competitiveness are your comfortable with?',
	  	  value: 0,
	  	  sliderLevels: ['None', 'A small amount', 'A reasonable amount', 'Some', 'A big amount'],
	  	  equiv: 'easeOfCompetition'	  		  	
	  	},
	  	{
	  	  subject:'Uncertain',
	  	  prompt: 'How open do you want to keep your options?',
	  	  value: 0,
	  	  sliderLevels: ['Not much', 'Reasonably open', 'Open', 'Very open', 'Maximize options'],
	  	  equiv: 'optionValue'	  		  	
	  	}
	  ];

	     
	  // get careers
	  // done locally due to cross-domain ajax requests constraints
		$http.get('scripts/career_profiles.json')
		.then(function(response) {
			service.careers = response.data;
			service.careers.forEach(function(career) {
				// decode titles (i.e. &nbsp;)
				career.title = helpers.decodeHtml(career.title);
				// invert competitiveness score to work with selection algorithm
				career.custom_fields.easeOfCompetition = 6 - career.custom_fields.easeOfCompetition;
				// decode img url
				career.thumbnail_url = helpers.decodeHtml(career.featured_image.attachment_meta.sizes.thumbnail.url);
				// decode description text
				career.custom_fields.summaryHtml = helpers.decodeHtml(career.custom_fields.summaryHtml);
			});
			service.receivedFlag = true;
		}, function() {
			alert('error!');
		});

		service.careerSuitable = function(career_level, threshold, options) {
			if (options == 'Competitive') {
				return ((threshold > 4) || (threshold == 4 && career_level < 5) || (threshold == 3 && career_level < 4) || (threshold == 2 && career_level < 3) || (career_level < 2));
			} else if (options == 'Uncertain') {
				// this one is reversed...
				return ((threshold < 3) || (threshold == 5 && career_level < 3) || (career_level < 5));
			} else {
				return ((threshold > 3) || (threshold == 3 && career_level < 5) || (threshold < 3 && career_level < 4));
			}
		};


	  // update careers 
	  service.updateCareers = function(entries) {
		// reset all careers
		service.careers.forEach(function(career) {career.show = true;});

	  	// for every answer
	  	entries.forEach(function(answer) {
	  		if (service.careers) {
		  		// for every career		  		
		  		service.careers.forEach(function(career) {
		  			if(career.show) { // if other params have not already invalidated this career
					  // filter out every career that isn't suitable
						  var career_level = parseInt(career.custom_fields[answer.equiv]);
						  var threshold = answer.value + 1;
				  		career.show = service.careerSuitable(career_level, threshold, answer.subject);
				  	}
			  	});
		  	} else {
		  		console.log('no careers');
		  	}
	  	});
	  };

	  return service;
	});
