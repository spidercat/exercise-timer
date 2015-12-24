var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
	
	// Global variables (because I am a terrible person)
	$scope.timeLeft = '00:20';
	$scope.roundsLeft = '0/8';
	
	// Option variables
	$scope.rounds = '8';
	$scope.timeOff = '00:10';
	$scope.timeOn = '00:20';
	 
	$scope.changeValue = function(option, value) {
		if (option === 'rounds') {
			// Hold parsed int
			var numRounds = parseInt($scope.rounds);
			if (value === 'minus') {
				// Stops count from going below zero
				if (numRounds != 0) {
				$scope.rounds = numRounds - 1;
				}
			}
			else if (value === 'plus') {
				$scope.rounds = numRounds + 1;
			}
		}
		
		// Time off
		
		
	}
	
	// Write function that will increase/decrease minute
	
	
	
	

}]) // End controller