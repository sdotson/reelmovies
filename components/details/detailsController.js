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