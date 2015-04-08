(function() {
    'use strict';

    angular.module('app')

    .filter('minutesToHours', function() {
		return function(minutes) {
			var timeString = "";

			if (minutes >= 60) {
				 timeString = Math.floor(minutes/60) + ' hr. ';
			}
			if (minutes % 60 != 0) {
				timeString += minutes % 60 + ' min.';
			}

			return timeString;
		};
	});

})();