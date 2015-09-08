'use strict';
/* Controllers */
angular.module('dnd5e.controllers.spells', []).controller('spellsCtrl', ['$scope', '$sce', '$routeParams', '$http',
    function($scope, $sce, $routeParams, $http) {
        var password;
        $http.get('/check-session')
        .success(function(result) {
            if(result === false) {
                password = window.prompt('Please enter the password:');
            }
            $http.get('/spells?password=' + password)
            .success(function(spells) {
                $scope.spells = spells;
                for (var i = 0; i < $scope.spells.length; i++) {
                    if (typeof $scope.spells[i].description == 'string') {
                        $scope.spells[i].description = $sce.trustAsHtml(nl2br($scope.spells[i].description));
                    }
                    if (typeof $scope.spells[i].classes == 'string') {
                        $scope.spells[i].classes = $scope.spells[i].classes.split(', ');
                    }
                }
                $scope.levels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
                $scope.classes = [];
                $scope.schools = [];
                $scope.ritual = 2;
                $scope.classRestrict = 0;
                for (var i = 0; i < $scope.spells.length; i++) {
                    $scope.spells[i].classes.forEach(function(class_to_add) {
                        for (var j = 0; j < $scope.classes.length; j++) {
                            if ($scope.classes[j] == class_to_add) {
                                return;
                            }
                        }
                        $scope.classes.push(class_to_add);
                    });
                    var has_school = false;
                    for (var j = 0; j < $scope.schools.length; j++) {
                        if ($scope.schools[j] == $scope.spells[i].school) {
                            has_school = true;
                        }
                    }
                    if (!has_school) {
                        $scope.schools.push($scope.spells[i].school);
                    }
                }
                $scope.classes.sort();
                $scope.schools.sort();
                $scope.spellLevels = [];
                $scope.spellClasses = [];
                $scope.spellSchools = ['Abjuration', 'Conjuration', 'Divination', 'Enchantment', 'Evocation', 'Illusion', 'Necromancy', 'Transmutation'];
                $scope.spellsSelected = [];
                if ($routeParams) {
                    if ($routeParams.levels && $routeParams.levels !== 'a') $scope.spellLevels = $routeParams.levels.split(',');
                    if ($routeParams.classes && $routeParams.classes !== 'b') $scope.spellClasses = $routeParams.classes.split(',');
                    if ($routeParams.schools && $routeParams.schools !== 'c') $scope.spellSchools = $routeParams.schools.split(',');
                    if ($routeParams.selected && $routeParams.selected !== 'd') $scope.spellsSelected = $routeParams.selected.split(',');
                    if ($routeParams.title && $routeParams.title !== 'e') $scope.pageTitle = $routeParams.title;
                    $scope.setTitle();
                }
            });
        });
        $scope.showSubclasses = function(spellClass) {
            return !(+$scope.classRestrict && spellClass.indexOf('(') !== -1);
        };
        $scope.filterSpellSelect = function(spell) {
            return $scope.matchesLevels(spell) && $scope.matchesClasses(spell) && $scope.matchesSchools(spell) && $scope.matchesRitual(spell);
        };
        $scope.filterSpell = function(spell) {
            return $scope.matchesLevels(spell) && $scope.matchesClasses(spell) && $scope.matchesSchools(spell) && $scope.matchesRitual(spell) && $scope.matchesSelected(spell);
        };
        $scope.matchesLevels = function(spell) {
            if($scope.spellLevels.length === 0) {
                return true;
            }
            for(var i = 0; i < $scope.spellLevels.length; i++) {
                if (spell.level === +$scope.spellLevels[i]) {
                    return true;
                }
            }
            return false;
        };
        $scope.matchesClasses = function(spell) {
            if($scope.spellClasses.length === 0) {
                return true;
            }
            var intersection = _.intersection(spell.classes, $scope.spellClasses);
            // No class restrictions
            if(($scope.classRestrict == '0' && intersection.length > 0) ||
               // Matches spells that belong to every class selected and none others
               ($scope.classRestrict == '1' && $scope.spellClasses.length === spell.classes.length && $scope.spellClasses.length === intersection.length)) {
                return true;
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
                if (spell.id === $scope.spellsSelected[i]) {
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
            return 'http://dnd.mcdevi.tt/#/spells/' +
                ($scope.spellLevels && $scope.spellLevels.length > 0 ? $scope.spellLevels.join(',') : 'a') + '/' +
                ($scope.spellClasses && $scope.spellClasses.length > 0 ? $scope.spellClasses.join(',') : 'b') + '/' +
                ($scope.spellScholls && $scope.spellSchools.length > 0 ? $scope.spellSchools.join(',') : 'c') + '/' +
                ($scope.spellsSelected && $scope.spellsSelected.length > 0 ? $scope.spellsSelected.join(',') : 'd') + '/' +
                ($scope.pageTitle ? $scope.pageTitle : 'e');
        };

        $scope.setTitle = function() {
            document.title = $scope.pageTitle || 'D&D 5e Tools';
        };

        function nl2br(input) {
            var lines = input.split('\n');
            return lines.join('<br />');
        }
    }
]);
