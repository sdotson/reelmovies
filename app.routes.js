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