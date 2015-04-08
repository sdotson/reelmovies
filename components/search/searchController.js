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