'use strict';
/* Controllers */
angular.module('wedding.controllers.contributions', []).controller('contributionsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.submit = function() {
            $http.post('/contributions/', {contribution: $scope.contribution})
            .success(function(results) {
                alert('Thanks for contributing!');
            })
            .error(function(error) {
                alert('An error occurred. Please alert the webmaster (Ian).');
            })
        };
    }
]);
