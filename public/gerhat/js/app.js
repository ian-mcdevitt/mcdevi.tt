'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'wedding.controllers.rsvp',
    'wedding.controllers.contributions',
    'wedding.directives',
    'wedding.filters'
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/ceremony/', {templateUrl: 'public/partials/ceremony.html'});
    $routeProvider.when('/reception/', {templateUrl: 'public/partials/reception.html'});
    $routeProvider.when('/rsvp/', {templateUrl: 'public/partials/rsvp.html', controller: 'rsvpCtrl'});
    $routeProvider.when('/contributions/', {templateUrl: 'public/partials/contributions.html', controller: 'contributionsCtrl'});
    $routeProvider.otherwise({templateUrl: 'public/partials/home.html'});
    $httpProvider.defaults.useXDomain = true;
}]);
