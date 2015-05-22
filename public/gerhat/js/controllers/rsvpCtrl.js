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
                $scope.invitation.friday = !!$scope.invitation.friday
                $scope.invitation.saturday = !!$scope.invitation.saturday
                $scope.invitation.sunday = !!$scope.invitation.sunday
            })
            .error(function(error) {
                console.log(error)
                $location.path('/');
            });
        }, 100);

        $scope.submit = function() {
            $http.post('/rsvp/' + password, $scope.invitation)
            .success(function(results) {
                alert('Thanks for RSVPing!');
                $location.path('/');
            })
        };
    }

]);
