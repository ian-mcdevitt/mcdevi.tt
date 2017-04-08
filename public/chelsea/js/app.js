'use strict';

// Declare app level module which depends on filters, and services
angular.module('chelsea', [
    'ngRoute',
    'chelsea.filters',
    'chelsea.controllers.home'
])
.config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.otherwise({templateUrl: 'public/partials/home.html', controller: 'homeCtrl'});
    $httpProvider.defaults.useXDomain = true;
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);
