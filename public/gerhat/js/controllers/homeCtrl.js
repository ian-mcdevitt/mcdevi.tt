'use strict';
/* Controllers */
angular.module('wedding.controllers.home', []).controller('homeCtrl', [
    function() {
        $('#countdown').countdown('2015/09/20 11:00:00', function(event) {
            $(this).html(event.strftime('%D days, %H hours, %M minutes, %S seconds'));
        });
    }
]);
