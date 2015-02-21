'use strict';

/* Controllers */

angular.module('dnd5e.controllers.shapeshift', ['ngSanitize']).controller('shapeshiftCtrl', ['$scope', '$sce', '$routeParams', 'beasts', function($scope, $sce, $routeParams, beasts) {
	$scope.beasts = beasts;
	$scope.min_cr = 0;
	$scope.max_cr = 6;
	$scope.swim = '2';
	$scope.flight = '2';
	$scope.elemental = '2';
	$scope.size = ["0.25","0.5","1","2","3"];
	$scope.enemy = {};
	$scope.enemy.ac = 14;
	$scope.enemy.attack = 6;
	$scope.enemy.dph = 10;

	$scope.filters = true;
	$scope.selected_creature = null;

	$scope.sort = 'name';
	$scope.sort_dir = false;

	$scope.recalculate_all_dpr = function() {
		$scope.beasts.forEach(function(beast) {
			beast.dpr = $scope.dpr_calc(beast);
			beast.survivability = $scope.survivability_calc(beast);
		});
	};

	$scope.dpr_calc = function(beast) {
		return Math.max(Math.min(((beast.attack + 20 - $scope.enemy.ac) / 20), 0.95), 0.05) * beast.damage * beast.attacks;
	};
	$scope.survivability_calc = function(beast) {
		return beast.hp / (Math.max(Math.min(((20 + $scope.enemy.attack - beast.ac) / 20), 0.95), 0.05) * $scope.enemy.dph);
	};

	$scope.beasts.forEach(function(beast) {
		beast.dpr = $scope.dpr_calc(beast);
		beast.survivability = $scope.survivability_calc(beast);
	});

	$scope.$watch('enemy.ac', function() {
		$scope.recalculate_all_dpr();
	});
	$scope.$watch('enemy.attack', function() {
		$scope.recalculate_all_dpr();
	});
	$scope.$watch('enemy.dph', function() {
		$scope.recalculate_all_dpr();
	});

	$scope.titles = [
		{title: 'Name', field: 'name'},
		{title: 'Size', field: 'size'},
		{title: 'CR', field: 'cr'},
		{title: 'AC', field: 'ac'},
		{title: 'HP', field: 'hp'},
		{title: 'Survivability', field: 'survivability', tooltip: "'Number of rounds this creature will survive against an enemy with specified attack/damage.'"},
		{title: 'Speed', field: 'speed'},
		{title: 'Swim', field: 'swim'},
		{title: 'Flight', field: 'flight'},
		{title: 'Attacks', field: 'attacks', tooltip: "'Number of attacks this creature can make per round.'"},
		{title: 'Modifier', field: 'attack'},
		{title: 'DPH', field: 'damage', tooltip: "'Average damage creature does on a hit.'"},
		{title: 'DPR', field: 'dpr', tooltip: "'Average damage per round against an enemy with specified AC.'"}
	];

	$scope.sizes = {
		'0.25': 'Tiny',
		'0.5': 'Small',
		'1': 'Medium',
		'2': 'Large',
		'3': 'Huge'
	};

	$scope.crs = {
		'0': '0',
		'0.125': '1/8',
		'0.25': '1/4',
		'0.5': '1/2',
	};
	$scope.cr_options = [
		{name: '0', value: 0},
		{name: '1/8', value: 0.125},
		{name: '1/4', value: 0.25},
		{name: '1/2', value: 0.5},
	];
	for(var i = 1; i < 7; i++) {
		$scope.crs[''+i] = ''+i;
		$scope.cr_options.push({name: i, value: i});
	}

	$scope.filterBeasts = function(beast) {
		if(
			beast.cr < $scope.min_cr ||
			beast.cr > $scope.max_cr ||
			beast.swim > 0 && $scope.swim == '0' ||
			beast.swim === 0 && $scope.swim == '1' ||
			beast.flight > 0 && $scope.flight == '0' ||
			beast.flight === 0 && $scope.flight == '1' ||
			beast.name.indexOf('Elemental') !== -1 && $scope.elemental == '0' ||
			beast.name.indexOf('Elemental') === -1 && $scope.elemental == '1' ||
			$scope.size.indexOf(''+beast.size) === -1 ||
			beast.name.indexOf('Elemental') !== -1 && $scope.elemental === false
		) { return false; }
		return true;
	};

	$scope.evaluateBeast = function(beast) {
		return beast[$scope.sort];
	};

	$scope.re_sort = function(field) {
		$scope.sort_dir = ( $scope.sort == field ? !$scope.sort_dir : true );
		$scope.sort = field;
	};

	$scope.select_creature = function(index) {
		$scope.selected_creature = index;
	};
	$scope.deselect_creature = function(index) {
		$scope.selected_creature = null;
	};
	$scope.abilityText = function(score) {
    	return [String(score),
            ' (',
            $scope.formattedModifier($scope.abilityModifier(score)),
            ')'].join('');
	};
	$scope.abilityModifier = function(score) {
		return Math.floor((score - 10)/2);
	};
    $scope.formattedModifier = function(modifier) {
	    if (modifier >= 0) {
	        return '+' + modifier;
	    } else {
	    	return '–' + Math.abs(modifier);	
	    }
  	};
}]);
