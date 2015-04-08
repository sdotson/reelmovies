(function() {
    'use strict';

    angular.module('app')

    .factory('ratingService', ['$http', function($http) {
	  var ratingService = {
	    setStyle: function(score) {
			var style = {};

			if (score > 0 && score < 25) {
				style.background = "#ff0000";
			} else if (score >= 25 && score < 50) {
				style.background = "#e8e642";
			} else if (score >- 50 && score < 75) {
				style.background = "#ffc000";
			} else {
				style.background = "#86c60c";
			};

			style.height = score + "%";

			return style;
		}

	  };
	  return ratingService;
	}]);

})();