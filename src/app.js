var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
	
	// Global variables (because I am a terrible person)
	$scope.timeLeft = '00:20';
	$scope.roundsLeft = '0';
	//$scope.roundsTotal = '8';
	
	// Option variables
	$scope.rounds = '8';
	$scope.timeOff = ['00', ':', '10'];
	$scope.timeOn = ['00', ':', '20'];
	$scope.timeOnJoined = $scope.timeOn.join('');
	$scope.timeOffJoined = $scope.timeOff.join('');
	 
	$scope.changeRounds = function(value) {
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
	} // End changeRounds()
	
	// Todo: If below 10, add 0 in front
	$scope.changeTimeOn = function(value) {
		var num = parseInt($scope.timeOn[2]);
		if (value === 'minus') {
			$scope.timeOn[2] = num - 1;
		}
		else if (value === 'plus') {
			$scope.timeOn[2] = num + 1;
		}
		$scope.timeOnJoined = $scope.timeOn.join('');
	} // End changeTimeOn()
	
		$scope.changeTimeOff = function(value) {
		var num = parseInt($scope.timeOff[2]);
		if (value === 'minus') {
			$scope.timeOff[2] = num - 1;
		}
		else if (value === 'plus') {
			$scope.timeOff[2] = num + 1;
		}
		$scope.timeOffJoined = $scope.timeOff.join('');
	} // End changeTimeOn()
	
	// Todo: Write function that will increase/decrease minute
	
	
	
	

}]) // End controller