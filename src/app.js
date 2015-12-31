var app = angular.module('tabataApp', []);
app.controller('tabataAppCtrl', ['$scope', function($scope) {
	
	// Global variables (because I am a terrible person)
	$scope.roundsLeft = 1;
	
	// Count down variables. See if I can remove values.
	$scope.breakLeft = ['00', ':', '55'];
	$scope.timeLeft = ['00', ':', '10'];
	
	$scope.breakLeftJoined = $scope.breakLeft.join('');
	$scope.timeLeftJoined = $scope.timeLeft.join('');
	
	// Option variables. Get copied for tempArray.
	$scope.rounds = 8;
	$scope.timeOff = ['00', ':', '55'];
	$scope.timeOn = ['00', ':', '10'];
	
	$scope.timeOnJoined = $scope.timeOn.join('');
	$scope.timeOffJoined = $scope.timeOff.join('');
	
	
	// Put 0 if digit less than 10
	function minTwoDigits(n) {
  	return (n < 10 ? '0' : '') + n;
	}
	
	// User adjusted rounds value
	$scope.changeRounds = function(value) {
		var numRounds = parseInt($scope.rounds);
		if ((value === 'minus') && (numRounds != 0)) {
			$scope.rounds = numRounds - 1;
		}
		else if (value === 'plus') {
			$scope.rounds = numRounds + 1;
		}
	} // End changeRounds()
	
	// User adjusted time on value
	$scope.changeTimeOn = function(value) {
		var seconds = parseInt($scope.timeOn[2]);
		var minutes = parseInt($scope.timeOn[0]);
		if (value === 'minus') {
			if (seconds == '00') {
				if (minutes == '00') {
					$scope.timeOff[0] = minTwoDigits(minutes);
				}
				else {
					$scope.timeOn[2] = '59';
					$scope.timeOn[0] = minTwoDigits(minutes - 1);
				}
			}
			else {
				$scope.timeOn[2] = minTwoDigits(seconds - 1);
			}
		}
		else if (value === 'plus') {
			if (seconds == '59') {
				$scope.timeOn[2] = '00';
				$scope.timeOn[0] = minTwoDigits(minutes + 1);
			}
			else {
				$scope.timeOn[2] = minTwoDigits(seconds + 1);
			}
		}
		$scope.timeOnJoined = $scope.timeOn.join('');
		var temp = $scope.timeOn.slice();
		$scope.timeLeft = temp;
		$scope.timeLeftJoined = $scope.timeOnJoined;
		$scope.$apply;
	} // End changeTimeOn()
	
	// User adjusted time off value
	$scope.changeTimeOff = function(value) {
		var seconds = parseInt($scope.timeOff[2]);
		var minutes = parseInt($scope.timeOn[0]);
		if (value === 'minus') {
			if (seconds == '00') {
				if (minutes == '00') {
					$scope.timeOff[0] = minTwoDigits(minutes);
				}
				else if (minutes != '00') {
					$scope.timeOff[2] = '59';
					$scope.timeOff[0] = minTwoDigits(minutes - 1);
				}
			}
			else {
				$scope.timeOff[2] = minTwoDigits(seconds - 1);
			}
		}
		else if (value === 'plus') {
			if (seconds == '59') {
				$scope.timeOff[2] = '00';
				$scope.timeOff[0] = minTwoDigits(minutes + 1);
			}
			else {
				$scope.timeOff[2] = minTwoDigits(seconds + 1);
			}
		}
		$scope.timeOffJoined = $scope.timeOff.join('');
		var temp = $scope.timeOff.slice();
		$scope.breakLeft = temp;
		$scope.breakLeftJoined = $scope.timeOffJoined;
		$scope.$apply;
	} // End changeTimeOn()
	
	
	// Todo: Set up for minutes
	$scope.startClock = function() {
		$('#pause-button').removeClass('hidden');
		$('#start-button').addClass('hidden');
		if ($scope.roundsLeft <= $scope.rounds) {
		
			if ($('#timeLeft').hasClass('hidden')) {		
				  breakLeftInterval = setInterval(function() {
					var minutes = parseInt($scope.breakLeft[0]);
					var seconds = parseInt($scope.breakLeft[2]);
					if (seconds != 00) {
						$scope.breakLeft[2] = minTwoDigits(seconds - 1);
						$scope.breakLeftJoined = $scope.breakLeft.join('');
						$scope.$apply();
					}
					else if (seconds == 00) {
						$('#timeLeft').toggleClass('hidden');
						$('#breakLeft').toggleClass('hidden');
						$('#time-left').css('background-color', '#a5d6a7');
						var tempArray = $scope.timeOff.slice();
						$scope.breakLeft = tempArray;
						$scope.breakLeftJoined = $scope.timeOffJoined;
						$scope.$apply;
						clearInterval(breakLeftInterval);
						$scope.startClock();
					}
				}, 200);

			}

			else {
				  timeLeftInterval = setInterval(function() {
					var seconds = parseInt($scope.timeLeft[2]);
					if (seconds != 00) {
						$scope.timeLeft[2] = minTwoDigits(seconds - 1);
						$scope.timeLeftJoined = $scope.timeLeft.join('');
						$scope.$apply();
					}
					else if (seconds == 00) {
						$scope.roundsLeft = $scope.roundsLeft + 1;
						$('#breakLeft').toggleClass('hidden');
						$('#timeLeft').toggleClass('hidden');
						$('#time-left').css('background-color', '#ef9a9a');
					  // To hold copied array. Because apparently, assigning an array as a value
						// creates a pointer. What the hell, JavaScript? Yes, this took me a day to solve.
						var tempArray = $scope.timeOn.slice();
						$scope.timeLeft = tempArray;
						$scope.timeLeftJoined = $scope.timeOnJoined;
						$scope.$apply;
						clearInterval(timeLeftInterval);
						// Reset break
						$scope.startClock();
					}
				}, 200);
			}
			
		}
		else {
			$('#pause-button').addClass('hidden');
			$('#start-button').removeClass('hidden');		
		}
	}
	
	// Pause timer
	$scope.pauseClock = function() {
		clearInterval(breakLeftInterval);
		clearInterval(timeLeftInterval);
		$('#pause-button').addClass('hidden');
		$('#start-button').removeClass('hidden');
	}
	
	$scope.clear = function() {
		var temp = $scope.timeOff.slice();
		$scope.breakLeft = temp;
		$scope.breakLeftJoined = $scope.timeOffJoined;
		
		$scope.roundsLeft = 1;
		
		var tempArray = $scope.timeOn.slice();
		$scope.timeLeft = tempArray;
		$scope.timeLeftJoined = $scope.timeOnJoined;
		$scope.$apply;
		
		clearInterval(breakLeftInterval);
		clearInterval(timeLeftInterval);
		
		$('#pause-button').addClass('hidden');
		$('#start-button').removeClass('hidden');
		
	}
	
	
//	 Fix them for if minute.  sound. break to over 1min then back down broken.

}]) // End controller