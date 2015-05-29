'use strict';
/* Controllers */
angular.module('wedding.controllers.contributions', []).controller('contributionsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.newContribution = {};
        $http.get('/contributions')
        .success(function(results) {
            $scope.contributions = results;
        })

        $scope.submit = function() {
            $http.post('/contributions/', $scope.newContribution)
            .success(function(results) {
                alert('Thanks for contributing!');
                $scope.contributions.push($scope.newContribution);
                $scope.newContribution = {};
            })
            .error(function(error) {
                alert('An error occurred. Please alert the webmaster (Ian).');
            })
        };
    }
]);
