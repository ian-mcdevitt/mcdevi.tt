'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    //'ian.controllers.controllername',
])
.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    //$routeProvider.when('/pagename/', {templateUrl: 'public/partials/pagename.html', controller: 'pagenameCtrl'});
    //$routeProvider.otherwise({templateUrl: 'public/partials/pagename.html', controller: 'pagenameCtrl'});
    $httpProvider.defaults.useXDomain = true;
}]);
