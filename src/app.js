var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
	
	
	
	// Global variables (because I am a terrible person)
	//$scope.timeLeft = '00:20';
	$scope.roundsLeft = 1;
	$scope.breakLeft = ['00', ':', '10'];
	$scope.breakLeftJoined = $scope.breakLeft.join('');
	$scope.timeLeft = ['00', ':', '20'];
	$scope.timeLeftJoined = $scope.timeLeft.join('');
	
	
	// Option variables
	$scope.rounds = 8;
	$scope.timeOff = ['00', ':', '10'];
	$scope.timeOn = ['00', ':', '20'];
	
	$scope.timeOnJoined = $scope.timeOn.join('');
	$scope.timeOffJoined = $scope.timeOff.join('');
	
	//$scope.timeLeftJoined = $scope.timeOnJoined;
	
	
	
	// Put 0 if digit less than 10
	function minTwoDigits(n) {
  	return (n < 10 ? '0' : '') + n;
	}
	
	
	$scope.changeRounds = function(value) {
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
		//$scope.originalTime.timeOn = $scope.timeOnJoined;
		$scope.timeLeft = $scope.timeOnJoined;
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
		//$scope.originalTime.timeOff = $scope.timeOffJoined;
	} // End changeTimeOn()
	
	
	// Todo: Set up for minutes
	$scope.startClock = function() {
		
		if ($scope.roundsLeft <= $scope.rounds) {
		
			if ($('#timeLeft').hasClass('hidden')) {		
				var breakLeftInterval = setInterval(function() {
					var seconds = parseInt($scope.breakLeft[2]);
					$scope.breakLeft[2] = minTwoDigits(seconds - 1);
					$scope.breakLeftJoined = $scope.breakLeft.join('');
					$scope.$apply();
					if (seconds <= '00') {
						$('#timeLeft').removeClass('hidden');
						$('#breakLeft').addClass('hidden');
						$scope.breakLeft = $scope.timeOff;
						$scope.breakLeftJoined = $scope.breakLeft.join('');
						console.log($scope.breakLeftJoined);
						$scope.$apply;
						clearInterval(breakLeftInterval);
						// Reset break
						$scope.startClock();
					}
				}, 500);

			}

			else {
				var timeLeftInterval = setInterval(function() {
					var seconds = parseInt($scope.timeLeft[2]);
					$scope.timeLeft[2] = minTwoDigits(seconds - 1);
					$scope.timeLeftJoined = $scope.timeLeft.join('');
					$scope.$apply();
					console.log($scope.timeLeft[2]);
					if (seconds <= '00') {
						$scope.roundsLeft = $scope.roundsLeft + 1;
						$('#breakLeft').removeClass('hidden');
						$('#timeLeft').addClass('hidden');
						$scope.timeLeft = $scope.timeOn;
						$scope.timeLeftJoined = $scope.timeLeft.join('');
						console.log($scope.timeLeftJoined);
						$scope.$apply;
						clearInterval(timeLeftInterval);
						// Reset break
						$scope.startClock();
					}
				}, 500);
			}
			
		}
	}
	
// Currently breaks after a couple of rounds. 00:0-1. Type issue?
	
//	 Fix them for if minute. Two-way bind break with option. Add for loop, minus round after each timeOn. Pause and clear buttons

}]) // End controller