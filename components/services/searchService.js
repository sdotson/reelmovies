(function() {
    'use strict';

    angular.module('app')

    .factory('movieService', ['$http', function($http) {
	  var movieService = {
	    getResults: function(query) {
	      var promise = $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies.json', {
	          params: {
	               page_limit: '8',
	               page: '1',
	               q: query,
	               apikey: 'qhzc6dq7hpv3k65fdep9adbg',
	               callback: 'JSON_CALLBACK'
	           }
	      }).then(function (response) {
	        return response.data.movies;
	      });
	      return promise;
	    },

		getDetails: function(movieID) {
	      var promise = $http.jsonp('http://api.rottentomatoes.com/api/public/v1.0/movies/' + movieID + '.json', {
	          params: {
	               apikey: 'qhzc6dq7hpv3k65fdep9adbg',
	               callback: 'JSON_CALLBACK'
	           }
	      }).then(function (response) {
	        return response.data;
	      });
	      return promise;
	    }    



	  };
	  return movieService;
	}]);

})();