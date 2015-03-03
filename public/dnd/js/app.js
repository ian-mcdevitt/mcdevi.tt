'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'dnd5e.controllers.spells',
    'dnd5e.controllers.shapeshift',
    'dnd5e.directives',
    'dnd5e.filters'
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    $routeProvider.when('/spells/', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/spells/:levels', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/spells/:levels/:classes', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/spells/:levels/:classes/:schools', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/spells/:levels/:classes/:schools/:selected', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/spells/:levels/:classes/:schools/:selected/:title', {templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $routeProvider.when('/shapeshift/', {templateUrl: 'public/partials/shapeshift.html', controller: 'shapeshiftCtrl'});
    $routeProvider.otherwise({templateUrl: 'public/partials/spells.html', controller: 'spellsCtrl'});
    $httpProvider.defaults.useXDomain = true;
}]);
