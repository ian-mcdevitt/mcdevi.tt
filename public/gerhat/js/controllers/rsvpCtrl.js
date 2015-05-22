'use strict';
/* Controllers */
angular.module('wedding.controllers.rsvp', []).controller('rsvpCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        var password;
        window.setTimeout(function() {
            password = window.prompt('Please enter your personalized 10-character password:');
            $http.get('/rsvp/' + password)
            .success(function(results) {
                if(results.length === 0) $location.path('/');
                $scope.invitation = results;
            })
            .error(function() {
                $location.path('/');
            });
        }, 100);

        $scope.submit = function() {
            $http.post('/rsvp/' + password, $scope.invitation)
            .success(function(results) {
                console.log(results);
            })
        };
    }

]);
