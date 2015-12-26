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
	
	
	
	// Put 0 if digit less than 10
	function minTwoDigits(n) {
  	return (n < 10 ? '0' : '') + n;
	}
	
	
	$scope.changeRounds = function(value) {
		// Hold parsed int
		var numRounds = parseInt($scope.rounds);
		if ((value === 'minus') && (numRounds != 0)) {
			$scope.rounds = numRounds - 1;
		}
		else if (value === 'plus') {
			$scope.rounds = numRounds + 1;
		}
	} // End changeRounds()
	

	$scope.changeTimeOn = function(value) {
		var num = parseInt($scope.timeOn[2]);
		var min = parseInt($scope.timeOn[0]);
		if (value === 'minus') {
			if (num == '00') {
				if (min == '00') {
					$scope.timeOff[0] = minTwoDigits(min);
				}
				else {
					$scope.timeOn[2] = '59';
					$scope.timeOn[0] = minTwoDigits(min - 1);
				}
			}
			else {
				$scope.timeOn[2] = minTwoDigits(num - 1);
			}
		}
		else if (value === 'plus') {
			if (num == '59') {
				$scope.timeOn[2] = '00';
				$scope.timeOn[0] = minTwoDigits(min + 1);
			}
			else {
				$scope.timeOn[2] = minTwoDigits(num + 1);
			}
		}
		$scope.timeOnJoined = $scope.timeOn.join('');
	} // End changeTimeOn()
	
	
	$scope.changeTimeOff = function(value) {
		var num = parseInt($scope.timeOff[2]);
		var min = parseInt($scope.timeOn[0]);
		if (value === 'minus') {
			if (num == '00') {
				if (min == '00') {
					$scope.timeOff[0] = minTwoDigits(min);
				}
				else {
					$scope.timeOff[2] = '59';
					$scope.timeOff[0] = minTwoDigits(min - 1);
				}
			}
			else {
				$scope.timeOff[2] = minTwoDigits(num - 1);
			}
		}
		else if (value === 'plus') {
			if (num == '59') {
				$scope.timeOff[2] = '00';
				$scope.timeOff[0] = minTwoDigits(min + 1);
			}
			else {
				$scope.timeOff[2] = minTwoDigits(num + 1);
			}
		}
		$scope.timeOffJoined = $scope.timeOff.join('');
	} // End changeTimeOn()
	
	
	

	
	// Todo: Begin countdown on 'start'
	
	
	

}]) // End controller