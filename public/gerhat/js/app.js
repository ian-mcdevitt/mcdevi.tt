'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'wedding.controllers.home',
    'wedding.controllers.details',
    'wedding.controllers.rsvp',
    'wedding.controllers.contributions',
    'wedding.directives',
    'wedding.filters'
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/details/', {templateUrl: 'public/partials/details.html', controller: 'detailsCtrl'});
    $routeProvider.when('/rsvp/', {templateUrl: 'public/partials/rsvp.html', controller: 'rsvpCtrl'});
    $routeProvider.when('/contributions/', {templateUrl: 'public/partials/contributions.html', controller: 'contributionsCtrl'});
    $routeProvider.otherwise({templateUrl: 'public/partials/home.html', controller: 'homeCtrl'});
    $httpProvider.defaults.useXDomain = true;
}]);
