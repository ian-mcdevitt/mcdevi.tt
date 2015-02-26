'use strict';
/* Controllers */
angular.module('wedding.controllers.rsvp', []).controller('rsvpCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        window.setTimeout(function() {
            var password = window.prompt('Please enter your personalized 10-character password:');
            $http.get('/rsvp/' + password)
            .success(function(results) {
                if(results.length === 0) $location.path('/');
                $scope.invitation = results;
                console.log($scope.invitation);
            })
            .error(function() {
                $location.path('/');
            });
        }, 100);
    }
]);
