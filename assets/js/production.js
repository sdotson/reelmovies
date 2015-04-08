(function() {
  'use strict';

  angular.module('app', ['ngRoute'])

})();
(function() {
    'use strict';

    angular.module('app')

    .config(function($routeProvider) {
    	$routeProvider

    		.when('/', {
                templateUrl : 'components/home/homeView.html',
                controller  : 'homeController'
            })

            .when('/search/:terms', {
                templateUrl : 'components/search/searchView.html',
                controller  : 'searchController'
            })

            .when('/movies/:movieid', {
                templateUrl : 'components/details/detailsView.html',
                controller  : 'detailsController'
            })

            .otherwise({
            	templateUrl : 'components/home/homeView.html',
                controller  : 'mainController'
            });
    })

})();
(function() {
    'use strict';

    angular.module('app')

    .controller('detailsController', ['$scope', 'movieService','ratingService' ,'$routeParams' ,function($scope, movieService, ratingService, $routeParams) {
		$scope.$back = function() { 
			window.history.back();
		};    

		$scope.setStyle = function(score) {
		    return ratingService.setStyle(score);
	    }

	    movieService.getDetails($routeParams.movieid).then(function(d) {
		    $scope.movie = d;
		});
	}]);

})();
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
(function() {
    'use strict';

    angular.module('app')

    .controller('homeController', ['$scope', '$location', function($scope, $location) {
        $scope.fetchResults = function(){
            $location.path( "/search/" + $scope.search ); 
        };
    }]);

})();
(function() {
    'use strict';

    angular.module('app')

    .controller('searchController', ['$scope','movieService', 'ratingService', '$routeParams', '$location', function($scope, movieService, ratingService, $routeParams, $location) {
	    $scope.search = $routeParams.terms;

	    movieService.getResults($routeParams.terms).then(function(d) {
		    $scope.results = d;
		});

	    $scope.fetchResults = function(){
	    	$location.path( "/search/" + $scope.search ); 
	    };

	    $scope.setStyle = function(score) {
		    return ratingService.setStyle(score);
	    }
	}]);

})();
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