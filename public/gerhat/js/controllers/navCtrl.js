'use strict';
/* Controllers */
angular.module('wedding.controllers.nav', []).controller('navCtrl', ['$scope', '$location',
    function($scope, $location) {
        $scope.isActive = function(route) {
            console.log($location.path())
            return route === $location.path();
        }
    }
]);
