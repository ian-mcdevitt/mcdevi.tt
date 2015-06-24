'use strict';

// Declare app level module which depends on filters, and services
angular.module('ian', [
    'ngRoute',
    //'ian.controllers.controllername',
])
.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.when('/about', {templateUrl: 'public/partials/about.html'});
    $routeProvider.otherwise({templateUrl: 'public/partials/home.html'});
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
