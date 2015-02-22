'use strict';
/* Controllers */
angular.module('wedding.controllers.contributions', []).controller('contributionsCtrl', ['$scope', '$sce', '$routeParams', '$http',
    function($scope, $sce, $routeParams, $http) {
        $scope.filterSpellSelect = function(spell) {
            return $scope.matchesLevels(spell) && $scope.matchesClasses(spell) && $scope.matchesSchools(spell) && $scope.matchesRitual(spell);
        };
        $scope.filterSpell = function(spell) {
            return $scope.matchesLevels(spell) && $scope.matchesClasses(spell) && $scope.matchesSchools(spell) && $scope.matchesRitual(spell) && $scope.matchesSelected(spell);
        };
        $scope.matchesLevels = function(spell) {
            if ($scope.spellLevels.length === 0) {
                return true;
            }
            for (var i = 0; i < $scope.spellLevels.length; i++) {
                if (spell.level === +$scope.spellLevels[i]) {
                    return true;
                }
            }
            return false;
        };
        $scope.matchesClasses = function(spell) {
            if ($scope.spellClasses.length === 0) {
                return true;
            }
            for (var i = 0; i < $scope.spellClasses.length; i++) {
                for (var j = 0; j < spell.classes.length; j++) {
                    if (spell.classes[j] === $scope.spellClasses[i]) {
                        return true;
                    }
                }
            }
            return false;
        };
        $scope.matchesSchools = function(spell) {
            if ($scope.spellSchools.length === 0) {
                return true;
            }
            for (var i = 0; i < $scope.spellSchools.length; i++) {
                if (spell.school === $scope.spellSchools[i]) {
                    return true;
                }
            }
            return false;
        };
        $scope.matchesRitual = function(spell) {
        	if($scope.ritual === '0' && spell.name.indexOf('Ritual') !== -1) return false;
        	if($scope.ritual === '1' && spell.name.indexOf('Ritual') === -1) return false;
        	return true;
        };
        $scope.matchesSelected = function(spell) {
            if ($scope.spellsSelected.length === 0) {
                return true;
            }
            for (var i = 0; i < $scope.spellsSelected.length; i++) {
                if (spell.name === $scope.spellsSelected[i]) {
                    return true;
                }
            }
            return false;
        };
        $scope.ordinalEnding = function(i) {
            if (i % 10 == 1 && i % 100 != 11) {
                return 'st';
            } else if (i % 10 == 2 && i % 100 != 12) {
                return 'nd';
            } else if (i % 10 == 3 && i % 100 != 13) {
                return 'rd';
            } else {
                return 'th';
            }
        };
        $scope.generateUrl = function() {
            $scope.url = 'http://www.wilki.co/#/spells/' + ($scope.spellLevels.length > 0 ? $scope.spellLevels.join(',') : 'a') + '/' + ($scope.spellClasses.length > 0 ? $scope.spellClasses.join(',') : 'b') + '/' + ($scope.spellSchools.length > 0 ? $scope.spellSchools.join(',') : 'c') + '/' + ($scope.spellsSelected.length > 0 ? $scope.spellsSelected.join(',') : 'd') + '/';
        };

        function nl2br(input) {
            var lines = input.split('\n');
            return lines.join('<br />');
        }
    }
]);
