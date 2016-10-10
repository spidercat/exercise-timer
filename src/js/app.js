//todo: create switch screens function

var app = angular.module("tabataApp", []);
app.controller("tabataAppCtrl", ["$scope", function ($scope) {
	
	// If running, mute option buttons?
	
	
		
		// Set default volume as on
	$("#volume-switch").prop("checked", true);
		
		// Rounds object
	$scope.rounds = {
		roundsLeft: 1,
		totalRounds: 8
	};
	
	$scope.optionTimes = {
		timeOff: "00:10",
		timeOn: "00:20"
	};
	
	$scope.timerTimes = {
		breakTime: "00:10",
		workTime: "00:20"
	}
	
	$scope.timerStates = {
		breakRunning: false,
		workRunning: false
	}
	
	
	// Parse time string int integers
	function parseTime(time) {
		var time = time.split(":");
		var SECONDS = parseInt(time[1]);
		var MINUTES = parseInt(time[0]);
  	return [MINUTES, SECONDS];
	}
	
	// Put 0 if digit less than 10
	function minTwoDigits(n) {
		return (n < 10 ? "0" : "") + n;
	}
	

	// Adds or removes 1 second
	$scope.changeTime = function (currentTime, deltaTime) {
		var time = parseTime(currentTime);
		if (time[1] === 0 && deltaTime === "-1") {
			var newTime = (minTwoDigits(time[0]) + ":" + minTwoDigits(time[1])).toString();
			return newTime;	
		}
		
		var tempTime = minTwoDigits(eval(time[1] + deltaTime));
		var newTime = (minTwoDigits(time[0]) + ":" + tempTime).toString();
		console.log(newTime);
		return newTime;

		
		// if 60 or -1
	};
	
	/* Functions to change the option numbers
	================================================*/
	
	// Change the number of rounds
	$scope.changeRounds = function(currentRounds, deltaRounds) {
		if ($scope.rounds.totalRounds === 0 && deltaRounds === "-1") {
			return;
		}
		$scope.rounds.totalRounds = eval(currentRounds + deltaRounds);
	}
	
	// Could not find a way to pass property, so this is the hacky temporary solution
	$scope.changeTimeOff = function(currentTime, deltaTime) {
		var newTime = $scope.changeTime(currentTime, deltaTime);
		$scope.optionTimes.timeOff = newTime;
		$scope.timerTimes.breakTime = newTime;
	}
	
	$scope.changeTimeOn = function(currentTime, deltaTime) {
		var newTime = $scope.changeTime(currentTime, deltaTime);
		$scope.optionTimes.timeOn = newTime;
		$scope.timerTimes.workTime = newTime;
	}
	
	
	
	// Switch between break screen and work screen
	function switchScreens(value) {
		if (value === "toWork) {
				
		}
		else {
		}
				
	} // End switchScreens

	// Start the timer
	$scope.startClock = function() {
		$("#pause-button").removeClass("hidden");
		$("#start-button").addClass("hidden");
		// If there is a round left
		if ($scope.rounds.roundsLeft <= $scope.rounds.totalRounds) {
			// Break timer
			startInterval = setInterval(function() { 
				if (!$scope.timerStates.workRunning) {
					$scope.timerStates.breakRunning = true;
					var newTime = $scope.changeTime($scope.timerTimes.breakTime, "-1");
					$scope.timerTimes.breakTime = newTime;
					$scope.$apply();
					if (newTime === "00:00") {
						switchScreens("toWork");	
					}
				}
				else {
					
				}
			
		},1000);
		
			
			
			
			
		} // End if statement
	}; // End startClock()
	
	
	
	$scope.pauseClock = function() {
		$("#pause-button").addClass("hidden");
		$("#start-button").removeClass("hidden");
		clearInterval(startInterval);
	}
	
	$scope.clear = function() {
		clearInterval(startInterval);
		$scope.timerTimes.breakTime = $scope.optionTimes.timeOff;
		$scope.timerTimes.workTime = $scope.optionTimes.timeOn;
	}
	
	
	
	
	

}]); // End controller