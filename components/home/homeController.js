(function() {
    'use strict';

    angular.module('app')

    .controller('homeController', ['$scope', '$location', function($scope, $location) {
        $scope.fetchResults = function(){
            $location.path( "/search/" + $scope.search ); 
        };
    }]);

})();